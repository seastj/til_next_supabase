# comments 테이블 작업

## 1. 테이블 설정

- 테이블 명 : `comments`
- RLS : `활성화해 둠`

### 1.1. 칼럼 설정

- `id` : 기본
- `created_at` : 기본
- `content` > text > `Set as Empty String` > `Not Null`
- `author_id` > uuid > `auth.uid()` > `Not Null`
- `post_id` > `int8` > NULL > `Not Null`

### 1.2. FK 설정

- `public` > `post` > public.comments : `post_id` > public.posts : `id` > `Cascade` > 저장
- `public` > `profiles` > public.comments : `post_id` > public.profiles : `id` > `Cascade` > 저장

### 1.3. RLS 설정

- `Authentication` > `Policies` > `comments` > Create Policy 버튼

- `Anyone can select comment` > `SELECT` > `Default` > `true` > 저장버튼
- `Users can insert comment` > `INSERT` > `authnicated` > `(select auth.uid()) = author_id` > 저장버튼
- `Users can update comment` > `UPDATE` > `authnicated` > `(select auth.uid()) = author_id` > `(select auth.uid()) = author_id` > 저장버튼
- `Users can delete comment` > `DELETE` > `authnicated` > `(select auth.uid()) = author_id` > 저장버튼

## 2. 타입 생성

- Supabase 로그인 후 진행

```bash
npx supabase login
npm run generate-types
```

## 3. 타입 정리

- `/src/types/types.ts`

```ts
// 댓글
export type CommentEntity = Database['public']['Tables']['comments']['Row'];
export type InsertCommentEntity =
  Database['public']['Tables']['comments']['Insert'];
export type UpdateCommentEntity =
  Database['public']['Tables']['comments']['Update'];
export type CommentTableEntity = Database['public']['Tables']['comments'];
```
