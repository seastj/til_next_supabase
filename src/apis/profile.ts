import supabase from '@/lib/supabase/client';
import { deleteImagesInPath, uploadImage } from './image';

// 3. 프로필 업데이트
export async function updateProfile({
  userId,
  nickname,
  bio,
  avatarImageFile,
}: {
  userId: string;
  nickname: string;
  bio?: string;
  avatarImageFile?: File;
}) {
  // 1. 기존 아바타 이미지 삭제
  if (avatarImageFile) {
    await deleteImagesInPath(`${userId}/avatar`);
  }

  // 업로드된 url 을 보관할 변수
  let newAvatarUrl: string | null = null;

  // 2. 새로운 아바타 이미지 업로드
  if (avatarImageFile) {
    const fileExtension = avatarImageFile.name.split('.').pop() || 'webp';
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
    const filePath = `${userId}/avatar/${fileName}`;

    newAvatarUrl = await uploadImage({
      file: avatarImageFile,
      filePath: filePath,
    });
  }

  // 3. 프로필 테이블 업데이트 작업
  // 텍스트 필드만 바뀔 때는 기존 avatar_url을 그대로 두기 위한 payload 구성.
  const payload: {
    nickname: string;
    bio?: string;
    avatar_url?: string | null;
  } = { nickname, bio };

  if (avatarImageFile) {
    // 이미지가 새로 업로드된 경우에만 avatar_url을 덮어쓴다.
    payload.avatar_url = newAvatarUrl;
  }

  const { data, error } = await supabase
    .from('profiles')
    // .update({ nickname, bio, avatar_url: newAvatarUrl })
    .update(payload)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
