# 데이터캐싱 실습

## 1. 상세 페이지

- http://localhost:3000/todo-detail/100 글
- `/src/app/todo-detail 폴더` 생성
- `/src/app/todo-detail/[id] 폴더` 생성
- `/src/app/todo-detail/[id]/page.tsx 파일` 생성

```tsx
type TodoDetailPageProps = {
  params: Promise<{ id: number }>;
};
export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;
  return <div>{id} : 상세페이지</div>;
}
```

## 2. 링크 걸기

- `/src/components/todo/TodoItem.tsx` 업데이트

```tsx
'use client';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function TodoItem({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const handleDeleteClick = () => {};

  return (
    <div className='flex items-center justify-between border p-2'>
      {/* 링크 걸기 */}
      <Link href={`/todo-detail/${id}`}>{content}</Link>
      <Button onClick={handleDeleteClick} variant={'destructive'}>
        삭제
      </Button>
    </div>
  );
}
```

## 3. API 만들기

- `/src/apis/Todo.ts` : api 추가

```ts
// API 함수로 1개의 id 를 전달받아서 상세 내용 불러들이기 기능
export async function fetchTodoById(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL_DEMO}/todos/${id}`
  );
  if (!response.ok) throw new Error('상세데이터가 없습니다.');
  const data: Todo = await response.json();
  return data;
}
```

## 4. query hook 만들기

- `/src/hooks/todos/queries/useDataById.ts 파일` 생성

```ts
import { fetchTodoById } from '@/apis/todo';
import { useQuery } from '@tanstack/react-query';

export function useTodoDataById(id: number) {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchTodoById(id),
  });
}
```

## 5. 활용하기

- `/src/components/todo/TodoDetail.tsx 파일` 생성

```tsx
'use client';

import { useTodoDataById } from '@/hooks/todos/queries/useDataById';

const TodoDetail = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useTodoDataById(id);
  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러입니다.</div>;
  if (!data) return <div>자료가 없어요.</div>;

  return <div>TodoDetail : {data.title}</div>;
};

export default TodoDetail;
```

- `/src/app/todo-detail/[id]/page.tsx 파일` 업데이트

```tsx
import TodoDetail from '@/components/todo/TodoDetail';

type TodoDetailPage = {
  params: Promise<{ id: number }>;
};
export default async function TodoDetailPage({ params }: TodoDetailPage) {
  const { id } = await params;
  return <TodoDetail id={id} />;
}
```

## 6. 데이터캐싱 확인해보기

- Devtools 를 활용
- 처음에는 `stale` 상태이다.
- 이유는 기본 `staleTime` 이 `0` 으로 글로벌 세팅되어있다.
- 컴포넌트가 화면에 Mount 되면 `stale` 상태면 Refetching 으로 데이터 호출
- 웹브라우저의 WindowFocus 되면 `stale` 상태면 Refetching 으로 데이터 호출
- 네트워크가 끊겼다가 연결(Reconnect) 되면 `stale` 상태면 Refetching 으로 데이터 호출
- 옵션으로 refetchInterval 을 초단위로 지정하면 `stale` 상태면 Refetching 으로 데이터 호출

## 6.1. 리패칭 끄기 옵션

```ts
import { fetchTodoById } from '@/apis/todo';
import { useQuery } from '@tanstack/react-query';

export function useTodoDataById(id: number) {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchTodoById(id),
    // 1초 마다 리패칭
    // refetchInterval: 1000,
    refetchOnMount: false, // 마운트 시점에 리패칭끼
    refetchOnWindowFocus: false, // 윈도우 포커스 시점에 리패칭 끄기
    refetchOnReconnect: false, // 리커넥트 시정메 리패칭 끄기
    refetchInterval: false, // 인터벌 리패칭 끄기
  });
}
```

### 6.2. staleTime 옵션 이해하기

```tsx
export function useTodoDataById(id: number) {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchTodoById(id),
    // 5초 동안 fresh 유효기간
    staleTime: 5000,
  });
}
```

- stale 한 데이터의 역할은 일단 화면에 내용을 빠르게 출력 해주는 역할
- 리패칭이 끝나면 새로운 데이터를 출력시켜줌.
- 일단 캐싱된 데이터를 사용해서 빠르게 화면을 렌더링하고
- 최신데이터를 불러오는 리패칭 과정이 마무리 되면
- 그때 교체하는 방식

### 6.3. Refetching 4가지

- 전제 조건은 해당하는 캐시 데이터가 `stale` 상태라면
- Mount : 해당하는 캐시 데이터를 사용하는 컴포넌트가 마운트 될때
- WindowFocus : 사용자가 현재 탭으로 돌아올때
- Reconnect : 인터넷 연결이 끊어졌다가 다시 연결될 때
- Interval : 특정 시간을 주기로

## 7. 데이터캐싱 inactive 와 deleted 상태

- 전제조건이 다른 화면에 있을때.
- 컴포넌트가 unMount 가 된 경우 진행됨.

### 7.1. inactive 상태

- 전제조건이 다른 화면에 있을때.
- fresh 상태에서 inactive 상태 가능
- stale 상태에서 inactive 상태 가능
- gcTime 값이 안지나면 계속 inactive 상태

### 7.2 deleted 상태

- 전제 조건이 다른 화면에 있을 때
- gcTime 값이 지나면 자동으로 deleted 시켜버린다.
- 메모리 공간 절약해 줌.

```ts
import { fetchTodoById } from '@/apis/todo';
import { useQuery } from '@tanstack/react-query';

export function useTodoDataById(id: number) {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchTodoById(id),
    // 5초 동안 fresh 유효기간
    staleTime: 5000,
    // 10초 동안 inactive 상태 지정
    gcTime: 10000,
  });
}
```

## 8. 모든 옵션은 글로벌, 개별 설정 가능

- 우선은 글로벌 적용되고, 개별 설정 적용됨.
- 추천하는 글로벌 세팅
- `/src/components/providers/QueryProvider.tsx`

```tsx
// React 라면 아래 설정은 달라집니다.
// 현재 Next.js 에다가 셋팅을 진행함.
// 서버 사이드 렌더링을 위한 QueryClient 인스턴스 생성
// 각 요청마다 새로운 QueryClient 를 생성하여 상태 구분함.
const [client, setClient] = useState(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0,
          gcTime: 5 * 60 * 1000, // 5분
          refetchOnMount: true,
          refetchOnWindowFocus: true,
          refetchOnReconnect: false,
          refetchInterval: false,
        },
      },
    })
);
```
