# 회원가입 시 예외처리

- 회원가입을 하면 Supabase 에서 자동로그인을 시킴 (세션 생성함)
- `회원가입 성공`시 무조건 `로그아웃` 후 `로그인으로 이동`

## 1. `/src/apis/auth.ts` 업데이트

```ts
// supabase 백엔드에 사용자 이메일 회원가입
export async function signUpWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // 웹브라우저를 이용해서 이메일 회원가입
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  // 강제로 로그아웃 시키기
  await signOut();

  return data;
}
```

## 2. `src/hooks/mutations/auth/useSignUp.ts`

- `onMutate`, `onSuccess`, `onError`, `onSettled` 콜백을 모두 전달해 화면 단에서 후처리(토스트, 라우팅 등)를 제어할 수 있게 확장.

```ts
import { signUpWithEmail } from '@/apis/auth';
import { UseMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export function useSignUp(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUpWithEmail,
    onMutate: () => {
      if (callback?.onMutate) callback.onMutate();
    },
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
    onError: error => {
      console.error(error.message);
      if (callback?.onError) callback.onError(error);
    },
    onSettled: () => {
      if (callback?.onSettled) callback.onSettled();
    },
  });
}
```

## 3. `src/app/(default)/signup/page.tsx`

```tsx
const router = useRouter();

const { mutate, isPending } = useSignUp({
  onSuccess: () => {
    toast.success('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.', {
      position: 'top-center',
    });
    router.replace('/signin');
  },
  onError: error => {
    const message = getErrorMessage(error);
    toast.error(message, { position: 'top-center' });
  },
});
```
