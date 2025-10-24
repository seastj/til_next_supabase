// 블로그 에디터 컴포넌트 임포트
import BlogEditor from '@/components/BlogEditor';

/**
 * 블로그 전용 페이지
 * - 블로그 에디터만 집중적으로 사용
 * - 제목과 내용을 분리하여 관리
 * - 미리보기/편집 모드 토글 가능
 */
export default function BlogPage() {
  return (
    <div>
      {/* 페이지 제목 */}
      <h1 className='text-3xl font-bold mb-6 text-center'>블로그 에디터</h1>

      {/* 블로그 에디터 컴포넌트 */}
      <BlogEditor />
    </div>
  );
}
