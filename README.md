# Zustand 리뷰

## 1. 리액트 상태(state)에 대한 이해

### 1.1. 컴포넌트 상태 (로컬)

- useState
- State Driling : 컴포넌트에 props 로 state 를 전달함. (반복됨)

### 1.2. 앱 전역 상태 (글로벌)

- Context API
- Context API 를 응용한 라이브러리 : Redux, Recoil, `Zustand`, Mobx, Joitai...

### 1.3. 네트워크 상태

- 개발자가 직접 관리함(fetch,axios)
- 라이브러리 React Query

## 2. Zustand

- 레퍼런스 많음, 용량 작음, 배우기 쉬움, 설정도 `create` 로 정리됨.
- `npm install zustand`

## 3. 기본 사용법

- `/src/app/counter 폴더` 생성
- `/src/app/counter/page.tsx 파일` 생성

```tsx
function CounterPage() {
  return (
    <div>
      <h1 className='text 2xl font-bold'>Counter</h1>
    </div>
  );
}

export default CounterPage;
```

### 3.1. 전역 stores 생성하기

- `/src/stores 폴더` 생성
- `/src/stores/count.ts 파일` 생성

### 3.2. 단계별 store 생성

- 단계 1

```ts
import { create } from 'zustand';
create(콜백함수자리);
```

- 단계 2

```ts
import { create } from 'zustand';
create(() => {});
```

- 단계 3 : 객체(store) 한개를 리턴함.

```ts
import { create } from 'zustand';
create(() => {
  return 전역변수 store 객체
});
```

- 단계 4 : 객체(store) 한개를 리턴함.

```ts
import { create } from 'zustand';
create(() => {
  return {};
});
```

- 단계 5 : store 객체에는 state 와 action 키

```ts
import { create } from 'zustand';
create(() => {
  return {
    state: 초기값,
    action: state 변경하는 함수
  };
});
```

- 단계 6 : count 만들고, action 정의하기

```ts
import { create } from 'zustand';
create(() => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {},
    decrement: () => {},
  };
});
```

- 단계 7 : create 함수에는 set 매개변수가 있다.
- set 은 state 즉, count 의 값을 설정하는 기능

```ts
import { create } from 'zustand';
create(set => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {},
    decrement: () => {},
  };
});
```

- 단계 8 : create 함수에는 set 매개변수가 있다.
- get 은 state 즉, count 의 값을 읽는 기능

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {},
    decrement: () => {},
  };
});
```

- 단계 9 : get 활용하기

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // get 은 store 의 객체를 반환함
      get().count;
    },
    decrement: () => {},
  };
});
```

- 단계 10 : set 활용하기

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // get 은 store 의 객체를 반환함
      const count = get().count;
      // set(객체)
      set({ count: count + 1 });
    },
    decrement: () => {},
  };
});
```

- 단계 11 : set 사용 의문점
- `set({ ...state, count:count + 1 });`
- zustand 는 객체 내부의 state 의 키명을 기준으로 명시만 하면됨
- 키명을 명시하고 새로운 값만 작성해 주면됨.
- State 객체를 spread(...) 할 필요없음

- 단계 12 : set 사용시 함수형태도 지원함.

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // get 은 store 의 객체를 반환함
      const count = get().count;
      // set(객체)
      set({ count: count + 1 });

      // 함수형태 지원
      set(() => {
        return {};
      });
    },
    decrement: () => {},
  };
});
```

- 단계 13 : set 사용시 함수형태도 지원함.

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // get 은 store 의 객체를 반환함
      const count = get().count;
      // set(객체)
      set({ count: count + 1 });

      // 함수형태 지원
      set(store => {
        return { count: store.count };
      });
    },
    decrement: () => {},
  };
});
```

- 단계 14 : 보통 get 은 사용하지 않는다.

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // 함수형태 지원
      set(store => {
        return { count: store.count };
      });
    },
    decrement: () => {},
  };
});
```

- 단계 15 : 화살표 함수 줄이기

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // 함수형태 지원
      set(store => ({ count: store.count }));
    },
    decrement: () => {},
  };
});
```

- 단계 16 : 추가 구현

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // 함수형태 지원
      set(store => ({ count: store.count + 1 }));
    },
    decrement: () => {
      set(store => ({ count: store.count - 1 }));
    },
  };
});
```

- 단계 17 : 타입 추가

```ts
import { create } from 'zustand';

type CountStoreType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

create<CountStoreType>((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // 함수형태 지원
      set(store => ({ count: store.count + 1 }));
    },
    decrement: () => {
      set(store => ({ count: store.count - 1 }));
    },
  };
});
```

- 단계 18 : create 함수는 커스텀 훅을 즉시 리턴함

```ts
import { create } from 'zustand';

type CountStoreType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

// 커스텀 훅을 리턴해준다.
export const useCountStore = create<CountStoreType>((set, get) => {
  return {
    // state : 초기값
    count: 0,
    // action : state 변경
    increment: () => {
      // 함수형태 지원
      set(store => ({ count: store.count + 1 }));
    },
    decrement: () => {
      set(store => ({ count: store.count - 1 }));
    },
  };
});
```

## 4. 기본 활용하기

- `/src/app/counter/page.tsx 파일`

```tsx
'use client';
import { Button } from '@/components/ui/button';
import { useCountStore } from '@/stores/count';

function CounterPage() {
  const { count, increment, decrement } = useCountStore();
  return (
    <div>
      <h1 className='text 2xl font-bold'>Counter</h1>
      <p>{count}</p>
      <Button onClick={increment}>증가</Button>
      <Button onClick={decrement}>감소</Button>
    </div>
  );
}

export default CounterPage;
```

## 5. 역할별로 파일 분리하기

### 5.1. 컴포넌트로 분리하기

- `/src/components/counter 폴더` 생성
- `/src/components/counter/Viewer.tsx 파일` 생성

```tsx
'use client';
import { useCountStore } from '@/stores/count';

const Viewer = () => {
  const { count } = useCountStore();
  return <div className='text-4xl font-bold'>{count}</div>;
};

export default Viewer;
```

- `/src/components/counter/Controler.tsx 파일` 생성

```tsx
'use client';

import { useCountStore } from '@/stores/count';
import { Button } from '../ui/button';

const Controler = () => {
  const { decrement, increment } = useCountStore();
  return (
    <div>
      <Button onClick={decrement}>감소</Button>
      <Button onClick={increment}>증가</Button>
    </div>
  );
};

export default Controler;
```

### 5.2. page 출력하기

- `/src/app/counter/page.tsx`

## 6. 컴포넌트의 리랜더링 상태 파악하기

### 6.1. 웹브라우저의 React Developer Tools 를 설치함.

- https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko&pli=1
- 설치후 > 웹브라우저 F12 > Components 탭 > Setting(톱니모양) > Highlight updates when components render 활성화

### 6.2. 불필요한 리렌더링이 일어나는 이유

- 버튼은 리렌더링이 필요없는데 일어나는 이유
- 아래 구문은 count 즉, state 없지만, use훅이 전체 Store 를 반환하므로

```tsx
const { decrement, increment } = useCountStore();
```

### 6.3. 해당 문제 해결하기(간단함)

- 어떤 값을 가져올지 정확히 명시한 훅을 생성한다.
- 어떤 값을 가져올지 정확히 명시한 훅 함수를 `Selector 함수` 라고 함.

```tsx
'use client';

import { useCountStore } from '@/stores/count';
import { Button } from '../ui/button';

const Controler = () => {
  // Selector 함수 활용
  const increment = useCountStore(store => store.increment);
  const decrement = useCountStore(store => store.decrement);
  return (
    <div>
      <Button onClick={decrement}>감소</Button>
      <Button onClick={increment}>증가</Button>
    </div>
  );
};

export default Controler;
```

## 7. Store 의 구조가 불명확하다.

- state 와 action 의 조합이 store 이다.
- `actions 키` 를 명시함.

```ts
import { create } from 'zustand';

type CountStoreType = {
  count: number;
  actions: { increment: () => void; decrement: () => void };
};

// 커스텀 훅을 리턴해준다.
export const useCountStore = create<CountStoreType>((set, get) => {
  return {
    // state : 초기값
    count: 0,
    actions: {
      // action : state 변경
      increment: () => {
        // 함수형태 지원
        set(store => ({ count: store.count + 1 }));
      },
      decrement: () => {
        set(store => ({ count: store.count - 1 }));
      },
    },
  };
});
```

- Controler.tsx

```tsx
'use client';

import { useCountStore } from '@/stores/count';
import { Button } from '../ui/button';

const Controler = () => {
  // Selector 함수 활용
  const { increment, decrement } = useCountStore(store => store.actions);
  return (
    <div>
      <Button onClick={decrement}>감소</Button>
      <Button onClick={increment}>증가</Button>
    </div>
  );
};

export default Controler;
```

## 8. store 의 state 또는 action 단어가 바뀌면 모두 뜯어 고쳐야 한다.

- 복잡한 프로젝트는 Select 함수를 컴포넌트에서 직접 불러서 활용하는 경우 드물다.

### 8.1. 전용 커스텀 훅으로 생성 후 활용함. (간단함)

- count.ts

```ts
import { create } from 'zustand';

type CountStoreType = {
  count: number;
  actions: {
    increment: () => void;
    decrement: () => void;
  };
};

// 커스텀 훅을 리턴해준다. 아주 좋다.
export const useCountStore = create<CountStoreType>((set, get) => {
  return {
    count: 0,
    actions: {
      increment: () => {
        // 함수형태 지원
        set(store => ({ count: store.count + 1 }));
      },
      decrement: () => {
        set(store => ({ count: store.count - 1 }));
      },
    },
  };
});

// 전용 훅들
export const useCount = () => {
  const count = useCountStore(store => store.count);
  return count;
};
export const useIncrement = () => {
  const increment = useCountStore(store => store.actions.increment);
  return increment;
};
export const useDecrement = () => {
  const decrement = useCountStore(store => store.actions.decrement);
  return decrement;
};
```

### 8.2. 컴포넌트에서 활용하기

- Viewer.tsx

```tsx
'use client';
import { useCount } from '@/stores/count';

const Viewer = () => {
  // Selector 함수
  const count = useCount();
  return <div className='text-4xl font-bold'>{count}</div>;
};

export default Viewer;
```

- Controller.tsx

```tsx
'use client';
import { useDecrement, useIncrement } from '@/stores/count';
import { Button } from '../ui/button';

const Controller = () => {
  // Selector 함수 활용
  const increment = useIncrement();
  const decrement = useDecrement();
  return (
    <div>
      <Button onClick={decrement}>Decrement</Button>
      <Button onClick={increment}>Increment</Button>
    </div>
  );
};

export default Controller;
```
