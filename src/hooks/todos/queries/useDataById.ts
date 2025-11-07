import { fetchTodoById } from '@/apis/todo';
import { useQuery } from '@tanstack/react-query';

export function useTodoDataById(id: number, type: 'LIST' | 'DETAIL') {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchTodoById(id),
    enabled: type === 'DETAIL',
  });
}
