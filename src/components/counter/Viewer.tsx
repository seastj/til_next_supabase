'use client';
import { useCount } from '@/stores/count';

const Viewer = () => {
  const count = useCount();
  return <div className='text-4xl font-bold'>{count}</div>;
};

export default Viewer;
