'use client';

import { useDecrement, useIncrement } from '@/stores/count';
import { Button } from '../ui/button';

const Controler = () => {
  // Selector 함수 활용
  const increment = useIncrement();
  const decrement = useDecrement();

  return (
    <div>
      <Button onClick={decrement}>감소</Button>
      <Button onClick={increment}>증가</Button>
    </div>
  );
};

export default Controler;
