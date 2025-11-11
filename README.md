# Post 등록하기 (글자)

## 1. 글등록 API 작성하기

- `/src/apis/post.ts 파일` 생성

```ts
import supabase from '@/lib/supabase/client';

// 1. 글 등록
export async function createPost({ content }: { content: string }) {
  const { data, error } = await supabase.from('posts').insert({ content });
  if (error) throw error;
  return data;
}
```

## 2. hook 생성하기

- Mutation 정리
- `/src/hooks/auth 폴더` 생성 및 관련 파일 이동
- `/src/hooks/mutations/post 폴더`
- `/src/hooks/mutations/post/useCreatePost.ts 파일` 생성

```ts
import { createPost } from '@/apis/post';
import { UseMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export function useCreatePost(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
    onError: error => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
```

## 3. 적용하기

- `/src/components/modal/PostEditorModal.tsx` 적용
- 단계 1. mutation 활용

```tsx
// 글등록 mutation 을 사용함.
const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
  onSuccess: () => {
    close();
  },
  onError: error => {
    toast.error('포스트 생성에 실패했습니다.', { position: 'top-center' });
  },
});
```

- 단계 2.

```tsx
// 실제 포스트 등록하기
const handleCreatePost = () => {
  if (content.trim() === '') return;
  createPost(content);
};
```
