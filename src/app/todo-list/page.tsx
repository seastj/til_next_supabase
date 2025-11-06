'use client';
import Link from 'next/link';
import { Todo } from '@/types/todo-type';
import { Button } from '@/components/ui/button';

export default function TodoItem({ id, title, completed, userId }: Todo) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  };

  const handleDeleteClick = () => {};

  return (
    <div className='flex items-center justify-between border p-2'>
      <div className='flex gap-5'>
        <input
          type={'checkbox'}
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <Link href={`/todo-detail/${id}`}>{title}</Link>
      </div>

      <Button onClick={handleDeleteClick} variant={'destructive'}>
        삭제
      </Button>
    </div>
  );
}
