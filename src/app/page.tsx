// 마크다운 에디터 컴포넌트들 임포트
import MarkdownEditor from '@/components/MarkdownEditor'; // 기본 에디터
import BlogEditor from '@/components/BlogEditor'; // 블로그 에디터
import AdvancedEditor from '@/components/AdvancedEditor'; // 고급 에디터
import CustomToolbarEditor from '@/components/CustomToolbarEditor'; // 커스텀 툴바 에디터
import DarkModeEditor from '@/components/DarkModeEditor'; // 다크 모드 에디터
import ImageEditor from '@/components/ImageEditor'; // 이미지 삽입 가이드

// Tiptap 에디터 컴포넌트들 임포트
import TiptapEditor from '@/components/TiptapEditor'; // Tiptap 기본 에디터
import AdvancedTiptapEditor from '@/components/AdvancedTiptapEditor'; // Tiptap 고급 에디터
import DarkTiptapEditor from '@/components/DarkTiptapEditor'; // Tiptap 다크 모드 에디터
import TiptapBlogEditor from '@/components/TiptapBlogEditor'; // Tiptap 블로그 에디터
import FullFeaturedTiptapEditor from '@/components/FullFeaturedTiptapEditor'; // 모든 기능이 포함된 Tiptap 에디터

/**
 * 마크다운 & Tiptap 에디터 수업 메인 페이지
 * - 모든 에디터 예제를 한 페이지에 표시
 * - 마크다운 에디터와 Tiptap 에디터 비교 학습
 * - 각 섹션별로 구분하여 학습 가능
 * - 실시간 미리보기 및 상호작용 가능
 */
export default function Home() {
  return (
    <main className='p-8'>
      {/* 페이지 제목 */}
      <h1 className='text-3xl font-bold mb-6'>마크다운 & Tiptap 에디터 수업</h1>

      {/* 에디터 예제들을 세로로 배치 */}
      <div className='space-y-12'>
        {/* 1. 기본 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>1. 기본 에디터</h2>
          <MarkdownEditor />
        </section>

        {/* 2. 블로그 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>2. 블로그 에디터</h2>
          <BlogEditor />
        </section>

        {/* 3. 고급 에디터 섹션 (미리보기 모드) */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>
            3. 고급 에디터 (미리보기 모드)
          </h2>
          <AdvancedEditor />
        </section>

        {/* 4. 커스텀 툴바 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>4. 커스텀 툴바 에디터</h2>
          <CustomToolbarEditor />
        </section>

        {/* 5. 다크 모드 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>5. 다크 모드 에디터</h2>
          <DarkModeEditor />
        </section>

        {/* 6. 이미지 삽입 가이드 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>6. 이미지 삽입 가이드</h2>
          <ImageEditor />
        </section>

        {/* 7. Tiptap 기본 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>7. Tiptap 기본 에디터</h2>
          <TiptapEditor />
        </section>

        {/* 8. Tiptap 고급 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>8. Tiptap 고급 에디터</h2>
          <AdvancedTiptapEditor />
        </section>

        {/* 9. Tiptap 다크 모드 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>
            9. Tiptap 다크 모드 에디터
          </h2>
          <DarkTiptapEditor />
        </section>

        {/* 10. Tiptap 블로그 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>10. Tiptap 블로그 에디터</h2>
          <TiptapBlogEditor />
        </section>

        {/* 11. 모든 기능이 포함된 Tiptap 에디터 섹션 */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>
            11. 모든 기능이 포함된 Tiptap 에디터
          </h2>
          <FullFeaturedTiptapEditor />
        </section>
      </div>
    </main>
  );
}
