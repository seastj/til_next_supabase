# 프로필 추가를 위한 테이블 생성

## 1. 테이블 구성

- `profiles`
- `SNS 서비스 회원 프로필`
- RLS 해제

## 2. 칼럼 구성

- id : `uuid`, `auth.uid()`
- created_at : 기본
- nickname : `text`, `Empty`, `Not Null`
- bio : `text`, `Empty`, `Not Null`
- avatar_url : `text`
- role : `text`, "MEMBER", `Not Null`
- 반드시 save 버튼 클릭

## 3. Type Script 데이터형 출력

- 터미널 작업(Supabase 사이트 로그인 후 진행)

```bash
npx supabase login
```

- 로그인 인증 이후 타입 출력

```bash
npm run generate-types
```

## 4. profiles 타입정의 작성

- `/src/types/types.ts` 업데이트

```ts
import { type Database } from './database.types';

// 포스트 관련
export type PostEntity = Database['public']['Tables']['posts']['Row'];
export type InsertPostEntity = Database['public']['Tables']['posts']['Insert'];
export type UpdatePostEntity = Database['public']['Tables']['posts']['Update'];
export type PostTableEntity = Database['public']['Tables']['posts'];
// 프로필 관련
export type ProfileEntity = Database['public']['Tables']['profiles']['Row'];
export type InsertProfileEntity =
  Database['public']['Tables']['profiles']['Insert'];
export type UpdateProfileEntity =
  Database['public']['Tables']['profiles']['Update'];
export type ProfileTableEntity = Database['public']['Tables']['profiles'];

export type UseMutationCallback = {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
```

## 5. 회원 프로필 자동 추가 관련

### 5.1. 데이터베이스 `트리거`

- 일반적으로 회원가입 후 자동으로 DB 에서 트리거를 통해 회원정보 입력이 기본
- `트리거` 는 JS 의 `이벤트 핸들러` 라고 생각하면 된다.
- 어떤 이벤트가 발생하면 이후 자동으로 실행되는 함수를 말함.
- DB 에 사용자가 추가되면 `새로운 profiles 에 데이터를 입력하라`는 것
- DB 전문가가 있는 경우 일반적으로 진행하는 형태

### 5.2. `트리거`의 문제점

- 트리거가 에러시 대응이 어렵다.
- `DB 전문가가 디버깅`을 하는 어려움이 있음.
- 리액트에서 처리해도 된다.
- 최대한 안전하게 그리고 대응이 수월하도록 React 에서 처리함.

## 6. 애플리케이션에서 처리하는 과정

- 회원가입 완료
- 완료 후 나의 프로필이 있는지 profiles 테이블에 조회진행 (select)
- 조회의 결과가 없다면
- 프로필을 생성하는 단계 요청
- 데이터 조회의 과정은 useQuery 로 진행
- 데이터 입력의 과정은 useMutation 으로 진행

# useQuery 의 이해

## 1. React Query

- `서버의 상태를 관리`함.
- 대표적인 `서버의 상태`
  - 로딩상태(isLoading)
  - 성공, 실패 상태(status)
  - 에러객체(error)
  - 캐시상태(cacheOption)
- 설치 : `npm i @tanstack/react-query`

## 2. React Query 설정

- `/src/components/providers/QueryProvider.tsx`

```tsx
const [client, setClient] = useState(() => new QueryClient());
```

- 적용 : `/src/app/layout.tsx` 확인

## 3. 실습용 서버 URL

- https://jsonplaceholder.typicode.com/

## 4. 데이터 조회 요청 관리

### 4.1. 실습 예제 구성

- `/src/components/todo 폴더` 생성
- `/src/components/todo/TodoEditor.tsx 파일` 생성

```tsx
'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const TodoEditor = () => {
  const [content, setContent] = useState('');
  const handleAddClick = () => {
    if (content.trim() === '') return;
    setContent('');
  };
  return (
    <div className='flex gap-2'>
      <Input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder='새로운 할 일을 입력하세요 ...'
      />
      <Button onClick={handleAddClick}>추가</Button>
    </div>
  );
};

export default TodoEditor;
```

- `/src/components/todo/TodoItem.tsx 파일` 생성

```tsx
'use client';
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
      {content}
      <Button onClick={handleDeleteClick} variant={'destructive'}>
        삭제
      </Button>
    </div>
  );
}
```

### 4.2. 페이지 구성

- `/src/app/todo-list 폴더` 생성
- `/src/app/todo-list/page.tsx` 생성

```tsx
import TodoEditor from '@/components/todo/TodoEditor';
import TodoItem from '@/components/todo/TodoItem';

export default function TodoListPage() {
  return (
    <div className='flex flex-col gap-5 p-5'>
      <h1 className='text-2xl font-bold'>Todo List</h1>
      <TodoEditor />
      <div className='flex flex-col gap-2'>
        <TodoItem id={1} content='Todo 1' />
        <TodoItem id={2} content='Todo 2' />
        <TodoItem id={3} content='Todo 3' />
      </div>
    </div>
  );
}
```

## 5. 비동기 API 구성

### 5.1. 기존 방식

- 직접 개발자가 API 를 다루어 줌.
- `/src/app/todo-list/page.tsx`

```tsx
'use client';
import TodoEditor from '@/components/todo/TodoEditor';
import TodoItem from '@/components/todo/TodoItem';
import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

// API 함수로 할일 목록 전체 불러들이기 기능
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) throw new Error('목록을 가져오는데 실패함.');
  const todos: Todo[] = await response.json();
  return todos;
}

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // api 함수 호출
  const getTodos = async () => {
    setIsLoading(true);

    try {
      const result = await fetchTodos();
      setTodos(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // API 호출
    getTodos();
  }, []);
  return (
    <div className='flex flex-col gap-5 p-5'>
      <h1 className='text-2xl font-bold'>Todo List</h1>
      <TodoEditor />
      <div className='flex flex-col gap-2'>
        {todos.map(item => (
          <TodoItem key={item.id} content={item.title} id={item.id} />
        ))}
        <TodoItem id={1} content='Todo 1' />
        <TodoItem id={2} content='Todo 2' />
        <TodoItem id={3} content='Todo 3' />
      </div>
    </div>
  );
}
```

### 5.2. useQuery 로 진행

- `/src/app/todo-list/page.tsx`

```tsx
'use client';
import TodoEditor from '@/components/todo/TodoEditor';
import TodoItem from '@/components/todo/TodoItem';
import { useQuery } from '@tanstack/react-query';

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

// API 함수로 할일 목록 전체 불러들이기 기능
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) throw new Error('목록을 가져오는데 실패함.');
  const todos: Todo[] = await response.json();
  return todos;
}

export default function TodoListPage() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
  if (isLoading) return <div>로딩중 ...</div>;
  if (error) return <div>에러입니다 : {error.message}</div>;
  if (!todos) return <div>데이터가 없습니다.</div>;

  return (
    <div className='flex flex-col gap-5 p-5'>
      <h1 className='text-2xl font-bold'>Todo List</h1>
      <TodoEditor />
      <div className='flex flex-col gap-2'>
        {todos.map(item => (
          <TodoItem key={item.id} content={item.title} id={item.id} />
        ))}
      </div>
    </div>
  );
}
```

### 5.3. retry 옵션

- 기본값은 4회.
- retry 동안 `isLoading` 으로 처리됨.
- 일시적으로 네트워크 오류거나 서버가 느려지는 경우 자동으로 재요청.

```tsx
'use client';
import TodoEditor from '@/components/todo/TodoEditor';
import TodoItem from '@/components/todo/TodoItem';
import { useQuery } from '@tanstack/react-query';

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

// API 함수로 할일 목록 전체 불러들이기 기능
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.co3m/todos');
  if (!response.ok) throw new Error('목록을 가져오는데 실패함.');
  const todos: Todo[] = await response.json();
  return todos;
}

export default function TodoListPage() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    retry: 3,
  });
  if (isLoading) return <div>로딩중 ...</div>;
  if (error) return <div>에러입니다 : {error.message}</div>;
  if (!todos) return <div>데이터가 없습니다.</div>;

  return (
    <div className='flex flex-col gap-5 p-5'>
      <h1 className='text-2xl font-bold'>Todo List</h1>
      <TodoEditor />
      <div className='flex flex-col gap-2'>
        {todos.map(item => (
          <TodoItem key={item.id} content={item.title} id={item.id} />
        ))}
      </div>
    </div>
  );
}
```

### 5.4. 기능별 파일 분리

- type 분리 : `/src/types/todo-type.ts 파일` 생성

```ts
export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};
```

- api 분리 : `/src/apis/todo.ts 파일` 생성

```ts
import { Todo } from '@/types/todo-type';

// API 함수로 할일 목록 전체 불러들이기 기능
export async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.co3m/todos');
  if (!response.ok) throw new Error('목록을 가져오는데 실패함.');
  const todos: Todo[] = await response.json();
  return todos;
}
```

- `/src/hooks/todos 폴더` 생성
- `/src/hooks/todos/queries 폴더` 생성
- `/src/hooks/todos/queries/useFetchTodos.ts 파일` 생성

```ts
import { fetchTodos } from '@/apis/todo';
import { useQuery } from '@tanstack/react-query';

export function useFetchTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
}
```

- `/src/app/todo-list/page.tsx` 활용하기

```tsx
'use client';
import TodoEditor from '@/components/todo/TodoEditor';
import TodoItem from '@/components/todo/TodoItem';
import { useFetchTodos } from '@/hooks/todos/queries/useFetchTodos';

export default function TodoListPage() {
  const { data: todos, isLoading, error } = useFetchTodos();

  if (isLoading) return <div>로딩중 ...</div>;
  if (error) return <div>에러입니다 : {error.message}</div>;
  if (!todos) return <div>데이터가 없습니다.</div>;

  return (
    <div className='flex flex-col gap-5 p-5'>
      <h1 className='text-2xl font-bold'>Todo List</h1>
      <TodoEditor />
      <div className='flex flex-col gap-2'>
        {todos.map(item => (
          <TodoItem key={item.id} content={item.title} id={item.id} />
        ))}
      </div>
    </div>
  );
}
```

# useQuery 의 `데이터 캐싱 상태` 이해하기

- 아래처럼 작성시 ["todos"] 이름으로 데이터를 보관한다.

```ts
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
```

## 1. `캐시 데이터`

- 일정한 시간동안 중복된 데이터 요청이 있을 때 활용됨.
- 불필요한 데이터 요청이 들어오면 캐시 데이터를 즉시 리턴함.

## 2. 최신 데이터를 반영하여야 하는 경우

- 특정 시간 이후에 데이터가 자동으로 갱신됨.
- 원할 때 삭제하거나, 최신데이터를 반영하는 옵션을 제공함.

## 3. `캐시 데이터 상태 5가지 이해`가 필수

### 3.1. Fetching 상태

- 1번 단계
- api 요청시 `데이터가 불러들여지는 중`의 상태
- 캐시에 보관안됨.
- 완료 되면 `Fresh 상태`로 변경됨.

### 3.2. Fresh 상태

- 2번 단계
- 데이터가 최신상태, 즉 신선한 상태이다.
- 지금 불러온 데이터이므로 신선한 Fresh 상태라고 한다.
- 일정한 시간이 지나면 `Stale 상태`로 변경됨.

### 3.3. Stale 상태

- 3번 단계
- 데이터를 불러온지 일정 시간이 지나서 유통기한이 지나간 상태.
- 오래된 데이터다. 갱신이 필요함.
- 유통기한을 지정하고 싶다. (`staleTime` 옵션)
- staleTime 이 `글로벌로는 0` 으로 세팅된다.
- staleTime 이 `개별로` 세팅가능.

### 3.4. inactive 상태

- 4번 단계
- 조건 : 리액트 컴포넌트가 `화면에 안보이고 있을 때의 상태`
- `unMount 상태일때`
- gcTime 이 `글로벌로는 30분` 으로 세팅된다.
- gcTime 이 `개별로` 세팅가능.
- gcTime 이 지나면 deleted 상태가 됨.

### 3.5. deleted 상태

- 5번 단계
- 캐시 메모리 지워서 성능을 올려줌.

## 4. `언제 새로 데이터를 가지고 오는가?`

- 리패칭은 `Stale 상태`에서 실행됨.
- `Refetching` 이라고 함.
- `총 4가지 경우에 리패칭`이 일어남.

### 4.1. Mount

- 캐시 데이터를 사용하는 컴포넌트가 화면에 보일때 (Mount 될때) 리패칭함.

### 4.2. WindowFocus

- 사용자가 다른 탭에 갔다가 다시 원래의 탭을 선택할 때 리패칭함.

### 4.3. Reconnect

- 인터넷이 끊겼다가 다시 연결될때 리패칭함.

### 4.4. Interval

- 우리가 설정한 일정 시간 간격으로 리패칭함.
