import { create } from 'zustand';
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
// create 함수는 hook 을 리턴한다.
const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        // 불변성 유지 immer 적용
        immer(
          combine({ count: 0 }, (set, get) => ({
            actions: {
              increment: () => {
                get(); // 자동타입추론
                // 함수형태 지원 (store 대신에 state 작성이 관례)
                set(state => ({ count: state.count + 1 }));
              },
              decrement: () => {
                set(state => ({ count: state.count - 1 }));
              },
            },
          }))
        )
      ),
      {
        // 기본적으로 로컬스토리지에 저장됨
        name: 'countStore',
        // 보관할 대상을 지정함.
        partialize: state => ({ count: state.count }),
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    // 디버깅 구분용
    { name: 'countStore' }
  )
);

useCountStore.subscribe(
  store => store.count,
  (count, prevCount) => {
    console.log(count, prevCount);
    // 현재 스토어의 값을 읽어오기
    const store = useCountStore.getState();
    console.log(store);
    // 아래코드는 store의 count를 계속 업데이트 하므로   무한 루프가 돈다.
    // 현재 스토어의 값을 업데이트 하기
    // useCountStore.setState({ count: 100 });
    // 현재 스토어의 값을 업데이트 하기
    // useCountStore.setState(state => {
    //   state.count = 100;
    // });
  }
);
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
