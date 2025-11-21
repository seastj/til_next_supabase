# comment 댓글의 댓글

## 1. 댓글의 댓글을 배치시 고려사항

- 댓글의 배치 순서가 최신순이 아님.
- 시간이 오래된 순서로 배치하고 댓글출력

- `/src/apis/comment.ts` 일부 옵션 조절

```ts
// 2. 댓글 조회하기
export async function fetchComments(postId: number) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, author: profiles!author_id(*)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true }); // 오래된 순
  if (error) throw error;
  return data;
}
```

## 2. 캐시 데이터 정렬 후 갱신하기

- `\src\hooks\mutations\comment\useCreateComment.ts` 일부 옵션 조절

```ts
import { createComment } from '@/apis/comment';
import useProfileData from '@/hooks/queries/useProfileData';
import { QUERY_KEYS } from '@/lib/constants';
import { useSession } from '@/stores/session';
import { Comment, UseMutationCallback } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateComment(callback?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  return useMutation({
    mutationFn: createComment,
    onSuccess: newComment => {
      if (callback?.onSuccess) callback.onSuccess();
      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comments.post(newComment.post_id),
        comments => {
          if (!comments) throw new Error('댓글 목록을 찾을 수 없습니다.');
          if (!profile) throw new Error('사용자 정보를 찾을 수 없습니다.');
          // 정렬 순서 변경
          // return [...comments, { ...newComment, author: profile }];
          return [{ ...newComment, author: profile }, ...comments];
        }
      );
    },
    onError: error => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
```

## 3. 대댓글 테이블

### 3.1. 테이블의 변경

- Post ID 와 Comment ID 는 생성되어 있음.
- 추가로 `부모 Comment ID` 를 보관해서 관리.
- `comments` 테이블 칼럼 추가 > `edit table`
- `parent_comment_id` > `int8` > `Null` > `Allow Nullable`

### 3.2. FK 설정

- 부모 댓글의 칼럼 id 를 참조할 수 있도록 외래키 관계 설정
- Add foreign key reation 버튼 > `comments` > `parent_comment_id`> `id` > `cascade` > `cascade` > save 버튼

### 3.3. 타입 반영

```bash
npx supabase login
npm run generate-types
```

## 4. API 수정하기

- `/src/apis/comment.ts`
- `parentCommentId?: number;` 추가

```ts
// 1. 댓글 추가하기
export async function createComment({
  postId,
  content,
  parentCommentId,
}: {
  postId: number;
  content: string;
  parentCommentId?: number;
}) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      content: content,
      parent_comment_id: parentCommentId,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}
```

## 5. 기능구현하기

### 5.1. 대댓글 작성하기

- `/src/components/comment/CommentItem.tsx` 업데이트

```tsx
// 대댓글 상태관리
const [isReplying, setIsReplying] = useState(false);
const toggleReply = () => {
  setIsReplying(prev => !prev);
};
```

```tsx
<div className='flex items-center gap-2'>
  {/* 대댓글 버튼 수정 */}
  <div onClick={toggleReply} className='cursor-pointer hover:underline'>
    댓글
  </div>
  <div className='bg-border h-[13px] w-0.5'></div>
  <div>{formatTimeAgo(comment.created_at)}</div>
</div>
```

```tsx
{
  isReplying && (
    <div className='felx flex-col gap-2'>
      <CommentEditor
        type='REPLY'
        postId={comment.post_id}
        parentCommentId={comment.id}
        onClose={toggleReply}
      />
    </div>
  );
}
```

- `/src/components/comment/CommentEditor.tsx` 업데이트

- type 에 `REPLY` 추가

```tsx
type ReplyMode = {
  type: 'REPLY';
  postId: number;
  parentCommentId: number;
  onClose: () => void;
};
```

```tsx
type Props = CreateMode | EditMode | ReplyMode;
```

- 테스트 해보기

### 5.2. UI 개선

- `/src/components/comment/CommentEditor.tsx` 업데이트

```tsx
<div className='flex justify-end gap-2'>
  {props.type !== 'CREATE' && (
    <Button variant='secondary' onClick={() => props.onClose()}>
      취소
    </Button>
  )}
  <Button onClick={handleSaveComment} disabled={isPending}>
    {isPending ? '등록중...' : props.type === 'EDIT' ? '수정' : '작성'}
  </Button>
</div>
```

### 5.3. 대댓글 작성 기능 업데이트

- `/src/components/comment/CommentEditor.tsx` 업데이트

```tsx
const handleSaveComment = () => {
  if (content.trim() === '') return;
  // 요청을 보내서 Insert 진행함.
  if (props.type === 'CREATE') {
    createComment({ postId: props.postId, content });
  } else if (props.type === 'EDIT') {
    // update 실행
    updateComment({ id: props.commentId, content });
  } else if (props.type === 'REPLY') {
    // 대댓글 처리
    createComment({
      postId: props.postId,
      content,
      parentCommentId: props.parentCommentId,
    });
  }
};
```

- 테스트 : Supabase 테이블에서 확인

## 6. Mutation 업데이트 하기

- `/src/components/comment/CommentEditor.tsx` 업데이트

```tsx
// mutation 활용
const { mutate: createComment, isPending: isCreateCommentPending } =
  useCreateComment({
    onSuccess: () => {
      setContent('');
      // 대댓글 창이 보이면 닫아준다.
      if (props.type === 'REPLY') props.onClose();
    },
    onError: error => {
      toast.error('댓글 등록에 실패했습니다.', { position: 'top-center' });
    },
  });
```

- 테스트 : 대댓글 입력창 닫히는지 확인
- 전체코드

```tsx
'use client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import useCreateComment from '@/hooks/mutations/comment/useCreateComment';
import { toast } from 'sonner';
import useUpdateComment from '@/hooks/mutations/comment/useUpdateComment';

// 출력상태 구분 타입 정의
type CreateMode = {
  type: 'CREATE';
  postId: number;
};

type EditMode = {
  type: 'EDIT';
  commentId: number;
  initialContent: string;
  onClose: () => void;
};

type ReplyMode = {
  type: 'REPLY';
  postId: number;
  parentCommentId: number;
  onClose: () => void;
};

type Props = CreateMode | EditMode | ReplyMode;

export default function CommentEditor(props: Props) {
  // mutation 활용
  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCreateComment({
      onSuccess: () => {
        setContent('');
        // 대댓글 창이 보이면 닫아준다.
        if (props.type === 'REPLY') props.onClose();
      },
      onError: error => {
        toast.error('댓글 등록에 실패했습니다.', { position: 'top-center' });
      },
    });

  // 업데이트 mutation 활용
  const { mutate: updateComment, isPending: isUpdateCommentPending } =
    useUpdateComment({
      onSuccess: () => {
        (props as EditMode).onClose();
      },
      onError: error => {
        toast.error('댓글 수정에 실패했습니다.', { position: 'top-center' });
      },
    });

  const [content, setContent] = useState('');

  const handleSaveComment = () => {
    if (content.trim() === '') return;
    // 요청을 보내서 Insert 진행함.
    if (props.type === 'CREATE') {
      createComment({ postId: props.postId, content });
    } else if (props.type === 'EDIT') {
      // update 실행
      updateComment({ id: props.commentId, content });
    } else if (props.type === 'REPLY') {
      // 대댓글 처리
      createComment({
        postId: props.postId,
        content,
        parentCommentId: props.parentCommentId,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleSaveComment();
    }
  };

  // 초기에 EDIT 이라면 내용 출력
  useEffect(() => {
    if (props.type === 'EDIT') {
      setContent(props.initialContent);
    }
  }, []);

  const isPending = isCreateCommentPending || isUpdateCommentPending;

  return (
    <div className='flex flex-col gap-2'>
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={isPending}
        onKeyDown={handleKeyDown}
      />
      <div className='flex justify-end gap-2'>
        {props.type !== 'CREATE' && (
          <Button variant='secondary' onClick={() => props.onClose()}>
            취소
          </Button>
        )}
        <Button onClick={handleSaveComment} disabled={isPending}>
          {isPending ? '등록중...' : props.type === 'EDIT' ? '수정' : '작성'}
        </Button>
      </div>
    </div>
  );
}
```

## 7. 부모 댓글 아래에 자식 댓글 배치하기

- 중첩배치

- `src\components\comment\CommentList.tsx` 업데이트

### 7.1. 리턴받은 Comment 타입을 조건에 맞게 중첩해주는 함수

- 단계 1.

```tsx
// parent_comment_id 를 이용해서 중첩배열 구조 만들기
import { Comment } from '@/types/types';
function toNestedComments(comments: Comment[]) {}
```

- 단계 2.

```tsx
// parent_comment_id 를 이용해서 중첩배열 구조 만들기
import { Comment, NestedComment } from '@/types/types';
function toNestedComments(comments: Comment[]): 반환할타입[] {}
```

- 단계 3. 중첩타입 정의 (`/src/types/types.ts`)

```ts
// 중첩 댓글 타입
export type NestedComment = Comment & {
  parentComment?: number;
  children: NestedComment[]; // 재귀구조 패턴
};
```

- 단계 4. 반환타입 적용

```tsx
// parent_comment_id 를 이용해서 중첩배열 구조 만들기
import { Comment, NestedComment } from '@/types/types';
function toNestedComments(comments: Comment[]): NestedComment[] {}
```

- 단계 5. 함수 내부 작성

```tsx
// parent_comment_id 를 이용해서 중첩배열 구조 만들기
import { Comment, NestedComment } from '@/types/types';
function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach(comment => {
    if (!comment.parent_comment_id) {
      // 부모 댓글이 없으면 최상위 댓글이므로 그냥 등록
      result.push({ ...comment, children: [] });
    } else {
      // 부모 댓글의 아이디가 존재한다.
      // 부모댓글을 찾는다.
      const parentCommentIndex = result.findIndex(
        item => item.id === comment.parent_comment_id
      );

      // 부모 인덱스를 찾았다면, 인덱스를 통해서 자식으로 추가해줌
      result[parentCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment: result[parentCommentIndex],
      });
    }
  });

  return result;
}
```

- 단계 6. 함수 활용

```tsx
'use client';
import CommentItem from '@/components/comment/CommentItem';
import { useCommentsData } from '@/hooks/queries/useCommentsData';
import FallBack from '../FallBack';
import Loader from '../Loader';

// parent_comment_id 를 이용해서 중첩배열 구조 만들기
import { Comment, NestedComment } from '@/types/types';
function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach(comment => {
    if (!comment.parent_comment_id) {
      // 부모 댓글이 없으면 최상위 댓글이므로 그냥 등록
      result.push({ ...comment, children: [] });
    } else {
      // 부모 댓글의 아이디가 존재한다.
      // 부모댓글을 찾는다.
      const parentCommentIndex = result.findIndex(
        item => item.id === comment.parent_comment_id
      );

      // 부모 인덱스를 찾았다면, 인덱스를 통해서 자식으로 추가해줌
      result[parentCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment: result[parentCommentIndex],
      });
    }
  });

  return result;
}

export default function CommentList({ postId }: { postId: number }) {
  // 활용하기
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentsData(postId);

  if (fetchCommentsError) return <FallBack />;
  if (isFetchCommentsPending) return <Loader />;

  // 중첩된 배열로 만들어줌
  const nestedComments = toNestedComments(comments || []);

  return (
    <div className='flex flex-col gap-5'>
      {/* {comments?.map(comment => (
        <CommentItem key={comment.id} {...comment} />
      ))} */}
      {nestedComments.map(comment => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
```

### 7.2. 대댓글도 출력하기

- `src\components\comment\CommentItem.tsx` 업데이트
- Props 타입 변경(`NestedComment`)

```tsx
export default function CommentItem(comment: NestedComment) {
```

- children 출력

```tsx
{
  /* children 댓글 목록 출력 */
}
{
  comment.children.map(comment => (
    <CommentItem key={comment.id} {...comment} />
  ));
}
```

- 전체코드

```tsx
'use client';
import { formatTimeAgo } from '@/lib/time';
import { useSession } from '@/stores/session';
import { Comment, NestedComment } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CommentEditor from './CommentEditor';
import defaultAvatar from '/public/assets/icons/default-avatar.jpg';
import useDeleteComment from '@/hooks/mutations/comment/useDeleteComment';
import { toast } from 'sonner';
import { useOpenAlertModal } from '@/stores/alertModalStore';

export default function CommentItem(comment: NestedComment) {
  const session = useSession();

  // 삭제 mutation 활용하기
  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment({
      onSuccess: () => {
        toast.success('댓글 삭제에 성공했습니다.', { position: 'top-center' });
      },
      onError: error => {
        toast.error('댓글 삭제에 실패했습니다.', { position: 'top-center' });
      },
    });

  const openAlertModal = useOpenAlertModal();

  const [iseEditing, setIsEditing] = useState(false);

  // 대댓글 상태관리
  const [isReplying, setIsReplying] = useState(false);
  const toggleReply = () => {
    setIsReplying(prev => !prev);
  };

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };
  const handleDeleteComment = () => {
    openAlertModal({
      title: '댓글 삭제',
      description: `삭제된 댓글은 복구가 불가능합니다. 정말 삭제하시겠습니까?`,
      onPositive: () => deleteComment(comment.id),
      onNegative: () => {
        console.log('취소');
      },
    });
  };

  const isMine = session?.user.id === comment.author.id;

  return (
    <div className={'flex flex-col gap-8  border-b pb-5'}>
      <div className='flex items-start gap-4'>
        <Link href={'#'}>
          <div className='flex h-full flex-col'>
            <Image
              className='h-10 w-10 rounded-full object-cover'
              src={comment.author.avatar_url || defaultAvatar}
              width={40}
              height={40}
              alt={comment.author.nickname || '회원 이미지'}
            />
          </div>
        </Link>
        <div className='flex w-full flex-col gap-2'>
          <div className='font-bold'>{comment.author.nickname}</div>

          {iseEditing ? (
            <>
              <CommentEditor
                type='EDIT'
                commentId={comment.id}
                initialContent={comment.content}
                onClose={toggleEditing}
              />
            </>
          ) : (
            <>
              <div>{comment.content}</div>
            </>
          )}

          <div className='text-muted-foreground flex justify-between text-sm'>
            <div className='flex items-center gap-2'>
              {/* 대댓글 버튼 수정 */}
              <div
                onClick={toggleReply}
                className='cursor-pointer hover:underline'
              >
                댓글
              </div>
              <div className='bg-border h-[13px] w-0.5'></div>
              <div>{formatTimeAgo(comment.created_at)}</div>
            </div>
            <div className='flex items-center gap-2'>
              {isMine && (
                <>
                  <div
                    className='cursor-pointer hover:underline'
                    onClick={toggleEditing}
                  >
                    수정
                  </div>
                  <div className='bg-border h-[13px] w-0.5'></div>
                  <div
                    onClick={handleDeleteComment}
                    className='cursor-pointer hover:underline'
                  >
                    {isDeleteCommentPending ? '삭제중...' : '삭제'}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isReplying && (
        <div className='felx flex-col gap-2'>
          <CommentEditor
            type='REPLY'
            postId={comment.post_id}
            parentCommentId={comment.id}
            onClose={toggleReply}
          />
        </div>
      )}

      {/* children 댓글 목록 출력 */}
      {comment.children.map(comment => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
```

### 7.3. UI/UX 적용하기

- `/src/components/comment/CommentItem.tsx` 업데이트

```tsx
'use client';
import useDeleteComment from '@/hooks/mutations/comment/useDeleteComment';
import { formatTimeAgo } from '@/lib/time';
import { useOpenAlertModal } from '@/stores/alertModalStore';
import { useSession } from '@/stores/session';
import { NestedComment } from '@/types/types';
import { CornerDownRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import CommentEditor from './CommentEditor';
import defaultAvatar from '/public/assets/icons/default-avatar.jpg';

export default function CommentItem(comment: NestedComment) {
  const session = useSession();

  // 삭제 mutation 활용하기
  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment({
      onSuccess: () => {
        toast.success('댓글 삭제에 성공했습니다.', { position: 'top-center' });
      },
      onError: error => {
        toast.error('댓글 삭제에 실패했습니다.', { position: 'top-center' });
      },
    });

  const openAlertModal = useOpenAlertModal();

  const [iseEditing, setIsEditing] = useState(false);

  // 대댓글 상태관리
  const [isReplying, setIsReplying] = useState(false);
  const toggleReply = () => {
    setIsReplying(prev => !prev);
  };

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };
  const handleDeleteComment = () => {
    openAlertModal({
      title: '댓글 삭제',
      description: `삭제된 댓글은 복구가 불가능합니다. 정말 삭제하시겠습니까?`,
      onPositive: () => deleteComment(comment.id),
      onNegative: () => {
        console.log('취소');
      },
    });
  };

  const isMine = session?.user.id === comment.author.id;

  // UI / UX 적용 : 일반적 댓글인지, 대댓글인지를 정의함
  const isRootComment = comment.parentComment === undefined;

  return (
    <div
      className={`flex flex-col gap-8 pb-5 ${isRootComment ? 'border-b' : 'ml-6'}`}
    >
      <div className='flex items-start gap-4'>
        <Link href={'#'}>
          <div className='flex h-full flex-col'>
            <Image
              className='h-10 w-10 rounded-full object-cover'
              src={comment.author.avatar_url || defaultAvatar}
              width={40}
              height={40}
              alt={comment.author.nickname || '회원 이미지'}
            />
          </div>
        </Link>
        <div className='flex w-full flex-col gap-2'>
          <div className='font-bold'>{comment.author.nickname}</div>

          {iseEditing ? (
            <>
              <CommentEditor
                type='EDIT'
                commentId={comment.id}
                initialContent={comment.content}
                onClose={toggleEditing}
              />
            </>
          ) : (
            <>
              <div>{comment.content}</div>
            </>
          )}

          <div className='text-muted-foreground flex justify-between text-sm'>
            <div className='flex items-center gap-2'>
              {/* 대댓글 버튼 수정 */}
              <div
                onClick={toggleReply}
                className='cursor-pointer hover:underline'
              >
                댓글
              </div>
              <div className='bg-border h-[13px] w-0.5'></div>
              <div>{formatTimeAgo(comment.created_at)}</div>
            </div>
            <div className='flex items-center gap-2'>
              {isMine && (
                <>
                  <div
                    className='cursor-pointer hover:underline'
                    onClick={toggleEditing}
                  >
                    수정
                  </div>
                  <div className='bg-border h-[13px] w-0.5'></div>
                  <div
                    onClick={handleDeleteComment}
                    className='cursor-pointer hover:underline'
                  >
                    {isDeleteCommentPending ? '삭제중...' : '삭제'}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isReplying && (
        <div className='felx flex-col gap-2'>
          <CommentEditor
            type='REPLY'
            postId={comment.post_id}
            parentCommentId={comment.id}
            onClose={toggleReply}
          />
        </div>
      )}

      {/* children 댓글 목록 출력 */}
      {comment.children.map(comment => (
        <div key={comment.id} className='flex items-center'>
          <div>
            <CornerDownRight />
          </div>
          <div className='flex-1'>
            <CommentItem key={comment.id} {...comment} />
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 8. 무한 대댓글

- 대대댓글 에 대해서 태그를 통해서 바로 위의 대대댓글임을 표현한다.
- 자신의 `최상위 댓글의 아이디`와 `댓글의 아이디` 도 알아야 함.

### 8.1. 최상위 글의 아이디를 위한 칼럼 추가

- supabase `comments` 테이블에 `칼럼 추가`
- `root_comment_id` > `int8` > `NULL`
- 외래키 관계 설정
- `public` > `comments` > `root_comment_id` > `id` > `Cascade` > `Cascade` > Save

### 8.2. 타입 정의

```bash
npm run generate-types
```

### 8.3. 댓글 추가 API 수정

- `src\apis\comment.ts` 수정

```ts
// 1. 댓글 추가하기
export async function createComment({
  postId,
  content,
  parentCommentId,
  rootCommentId,
}: {
  postId: number;
  content: string;
  parentCommentId?: number;
  rootCommentId?: number;
}) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      content: content,
      parent_comment_id: parentCommentId,
      root_comment_id: rootCommentId,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}
```

### 8.4. 컴포넌트 수정

- `src\components\comment\commentItem.tsx` 업데이트

```tsx
{
  isReplying && (
    <div className='felx flex-col gap-2'>
      <CommentEditor
        type='REPLY'
        postId={comment.post_id}
        parentCommentId={comment.id}
        rootCommentId={comment.root_comment_id || comment.id}
        onClose={toggleReply}
      />
    </div>
  );
}
```

- `src\components\comment\commentEditor.tsx` 업데이트

```tsx
type ReplyMode = {
  type: 'REPLY';
  postId: number;
  parentCommentId: number;
  rootCommentId: number; // 추가
  onClose: () => void;
};
```

```tsx
const handleSaveComment = () => {
  if (content.trim() === '') return;
  // 요청을 보내서 Insert 진행함.
  if (props.type === 'CREATE') {
    createComment({ postId: props.postId, content });
  } else if (props.type === 'EDIT') {
    // update 실행
    updateComment({ id: props.commentId, content });
  } else if (props.type === 'REPLY') {
    // 대댓글 처리
    createComment({
      postId: props.postId,
      content,
      parentCommentId: props.parentCommentId,
      rootCommentId: props.rootCommentId, // 추가
    });
  }
};
```

### 8.5. 댓글 리스트 `댓글 작성자 아이디` 출력

- `src\components\comment\CommentList.tsx` 업데이트
- `toNestedComments` 함수 업데이트

```tsx
function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach(comment => {
    if (!comment.parent_comment_id) {
      result.push({ ...comment, children: [] });
    } else {
      // 특정 댓글에 부모가 존재하므로 대댓글
      // 부모의 대한 정보를 찾아냄
      const rootCommentIndex = result.findIndex(
        item => item.id === comment.root_comment_id
      );
      // 실제 부모의 Comment 정보
      const parentComment = comments.find(
        item => item.id === comment.parent_comment_id
      );

      if (rootCommentIndex === -1) return;
      if (!parentComment) return;

      result[rootCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment,
      });
    }
  });

  return result;
}
```

- `src\components\comment\CommentItem.tsx` 해시태그 출력

```tsx
// 대댓글의 해시태그 출력
const isOverTowLevels = comment.parent_comment_id !== comment.root_comment_id;
```
