import { fetchTodos } from '@/apis/todo';
import { QUERY_KEYS } from '@/lib/constants';
import { Todo } from '@/types/todo-type';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useFetchTodos() {
  // 전역에서 관리하는 React Query 상태 참조
  const queryClinet = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.todo.list,
    // queryFn: fetchTodos,
    queryFn: async () => {
      // 함수 내부에서 정규화를 진행함.
      const todos = await fetchTodos();
      // console.log(todos);

      // 평탄화 작업
      todos.forEach(todo => {
        // 개별 캐시 데이터들까지 함께 보관하도록 설정
        queryClinet.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(todo.id.toString()),
          todo
        );
      });

      // todo 의 id 값 만을 따로 모아서 배열로 캐시 해둔다.
      return todos.map(item => item.id);
    },
  });
}
