import { updateTodo } from '@/apis/todo';
import { QUERY_KEYS } from '@/lib/constants';
import { queryClinet } from '@/lib/query-client';
import { Todo } from '@/types/todo-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTodoMutation() {
  // 1. 전역 접근용 변수
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    // mutate 함수가 실행되는 시점에 작성
    onMutate: async updatedTodo => {
      // 요청 취소 기능 구현
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.todo.list });

      // 원본 데이터를 보관함
      const originTodos = queryClinet.getQueryData<Todo[]>(
        QUERY_KEYS.todo.list
      );
      // 낙관적 업데이트 진행함
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, prevTodos => {
        if (!prevTodos) return [];
        return prevTodos.map(todo =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        );
      });

      // 원상 복구할 데이터를 리턴해 준다.
      return { originTodos };
    },
    // 에러가 발생함
    onError: (error, valiable, context) => {
      console.log(error);
      if (context?.originTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.originTodos
        );
      }
      return { error };
    },
    // 요청이 완료됨
    onSettled: () => {
      // 검증 과정
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todo.list });
    },
  });
}
