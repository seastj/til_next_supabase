import { fetchTodoById } from '@/apis/todo';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useTodoDataById(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.todo.detail(id.toString()),
    queryFn: () => fetchTodoById(id),
    staleTime: 5000, // 5초 동안 fresh 유효기간
    gcTime: 10000, // 10초 동안 inactive 상태 지정
  });
}
