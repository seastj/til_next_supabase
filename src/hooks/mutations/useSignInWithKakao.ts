import { signInWithOAuth } from '@/apis/auth';
import { UseMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export function useSignInWithKakao(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: error => {
      console.error(error);

      if (callback?.onError) {
        callback.onError(error);
      }
    },
  });
}
