'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { usePostByIdData } from '@/hooks/queries/usePostByIdData';
import { formatTimeAgo } from '@/lib/time';
import { useSession } from '@/stores/session';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import FallBack from '../FallBack';
import Loader from '../Loader';
import DeletePostButton from './DeletePostButton';
import EditPostItemButton from './EditPostItemButton';
import LikeButton from './LikeButton';
import defaultAvatar from '/public/assets/icons/default-avatar.jpg';
import Link from 'next/link';

export default function PostItem({ postId }: { postId: number }) {
  // 내가 만든 post 인지 확인
  const session = useSession();
  const userId = session?.user.id;
  // 실제 쿼리로 id 를 전달해서 post를 가져오자.
  const {
    data: post,
    isPending,
    error,
  } = usePostByIdData({ postId, type: 'FEED' });

  if (isPending) return <Loader />;
  if (error) return <FallBack />;

  const isMine = userId === post.author.id;

  return (
    <div className='flex flex-col gap-4 border-b pb-8'>
      <div className='flex justify-between'>
        <div className='flex items-start gap-4'>
          {/* 사용자 페이지 이동하기 */}
          <Link href={`/profile/${post.author.id}`}>
            <Image
              src={post.author.avatar_url || defaultAvatar}
              alt={`${post.author.nickname}의 프로필 이미지`}
              className='h-10 w-10 rounded-full object-cover'
              width={40}
              height={40}
            />
          </Link>
          <div>
            <div className='font-bold hover:underline'>
              {post.author.nickname}
            </div>
            <div className='text-muted-foreground text-sm'>
              {formatTimeAgo(post.created_at)}
              {/* {new Date(post.created_at).toLocaleString()} */}
            </div>
          </div>
        </div>

        <div className='text-muted-foreground flex text-sm'>
          {isMine && (
            <>
              <EditPostItemButton {...post} />
              <DeletePostButton id={post.id} />
            </>
          )}
        </div>
      </div>

      <div className='flex cursor-pointer flex-col gap-5'>
        <div className='line-clamp-2 break-words whitespace-pre-wrap'>
          {post.content}
        </div>

        <Carousel>
          <CarouselContent>
            {post.image_urls?.map((url, index) => (
              <CarouselItem className={`basis-3/5`} key={index}>
                <div className='overflow-hidden rounded-xl'>
                  <img
                    src={url}
                    className='h-full max-h-[350px] w-full object-cover'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className='flex gap-2'>
        <LikeButton
          id={post.id}
          likeCount={post.like_count}
          isLiked={post.isLiked}
        />
        <div className='hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm'>
          <MessageCircle className='h-4 w-4' />
          <span>댓글 달기</span>
        </div>
      </div>
    </div>
  );
}
