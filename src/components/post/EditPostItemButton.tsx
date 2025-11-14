'use client';
import { Button } from '@/components/ui/button';
import { useOpenEditPostModal } from '@/stores/postEditorModalStore';
import { PostEntity } from '@/types/types';

export default function EditPostItemButton(props: PostEntity) {
  const openPostEditorModal = useOpenEditPostModal();
  const handleClick = () => {
    openPostEditorModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls,
    });
  };

  return (
    <Button onClick={handleClick} className='cursor-pointer' variant={'ghost'}>
      수정
    </Button>
  );
}
