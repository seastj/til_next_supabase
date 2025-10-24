'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import { useEditor, EditorContent } from '@tiptap/react'; // Tiptap React 훅과 컴포넌트
import StarterKit from '@tiptap/starter-kit'; // 기본 확장 패키지
import Image from '@tiptap/extension-image'; // 이미지 확장 기능
import Link from '@tiptap/extension-link'; // 링크 확장 기능
import { useState } from 'react'; // React 상태 관리
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Link as LinkIcon,
  Image as ImageIcon,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react'; // 아이콘 라이브러리

/**
 * Tiptap 블로그 에디터 컴포넌트
 * - 제목과 내용을 분리하여 관리
 * - HTML 출력 기능
 * - 저장 및 미리보기 기능
 */
export default function TiptapBlogEditor() {
  // 블로그 상태 관리
  const [title, setTitle] = useState(''); // 블로그 제목
  const [showPreview, setShowPreview] = useState(false); // 미리보기 모드 여부

  // Tiptap 에디터 인스턴스 생성
  const editor = useEditor({
    extensions: [
      StarterKit, // 기본 확장 패키지
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg', // 이미지 스타일링
        },
      }),
      Link.configure({
        openOnClick: false, // 링크 클릭 시 새 창에서 열지 않음
        HTMLAttributes: {
          class: 'text-blue-500 underline hover:text-blue-700', // 링크 스타일링
        },
      }),
    ],
    content: '<p>블로그 내용을 작성해보세요...</p>', // 초기 내용
    immediatelyRender: false, // SSR hydration 불일치 방지
    editorProps: {
      attributes: {
        class: 'prose prose-lg mx-auto focus:outline-none min-h-[400px]', // 에디터 스타일링
      },
    },
  });

  /**
   * 저장 버튼 클릭 시 실행되는 함수
   * 현재는 콘솔에 HTML 출력 (실제 저장 로직은 추후 구현)
   */
  const handleSave = () => {
    const htmlContent = editor?.getHTML(); // 에디터의 HTML 내용 가져오기
    console.log('제목:', title);
    console.log('내용 (HTML):', htmlContent);
    alert('저장되었습니다! (콘솔을 확인하세요)');
  };

  /**
   * HTML 내용을 가져오는 함수
   */
  const getHTMLContent = () => {
    return editor?.getHTML() || '';
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Tiptap 블로그 에디터</h2>

      {/* 제목 입력 영역 */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          value={title}
          onChange={e => setTitle(e.target.value)} // 제목 상태 업데이트
          className='w-full text-2xl font-bold border-none outline-none bg-transparent'
        />
      </div>

      {/* 에디터 툴바 */}
      <div className='border border-gray-300 rounded-t-lg p-2 bg-gray-50'>
        <div className='flex flex-wrap gap-1'>
          {/* 기본 서식 버튼들 */}
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('bold')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='굵은 글씨 (Ctrl+B)'
          >
            <Bold size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('italic')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='기울임 (Ctrl+I)'
          >
            <Italic size={16} />
          </button>

          {/* 구분선 */}
          <div className='w-px h-8 bg-gray-300 mx-1'></div>

          {/* 제목 버튼들 */}
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('heading', { level: 1 })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='제목 1'
          >
            <Heading1 size={16} />
          </button>

          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('heading', { level: 2 })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='제목 2'
          >
            <Heading2 size={16} />
          </button>

          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('heading', { level: 3 })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='제목 3'
          >
            <Heading3 size={16} />
          </button>

          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('heading', { level: 4 })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='제목 4'
          >
            <Heading4 size={16} />
          </button>

          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('heading', { level: 5 })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='제목 5'
          >
            <Heading5 size={16} />
          </button>

          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('heading', { level: 6 })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='제목 6'
          >
            <Heading6 size={16} />
          </button>

          {/* 구분선 */}
          <div className='w-px h-8 bg-gray-300 mx-1'></div>

          {/* 링크 추가 버튼 */}
          <button
            onClick={() => {
              const url = window.prompt('URL을 입력하세요:');
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('link')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='링크 추가'
          >
            <LinkIcon size={16} />
          </button>

          {/* 이미지 추가 버튼 */}
          <button
            onClick={() => {
              const url = window.prompt('이미지 URL을 입력하세요:');
              if (url) {
                editor?.chain().focus().setImage({ src: url }).run();
              }
            }}
            className='p-2 rounded hover:bg-gray-200 transition-colors text-gray-700'
            title='이미지 추가'
          >
            <ImageIcon size={16} />
          </button>
        </div>
      </div>

      {/* 에디터 내용 영역 */}
      <div className='border border-gray-300 border-t-0 rounded-b-lg min-h-[400px] p-4'>
        <EditorContent editor={editor} />
      </div>

      {/* 하단 버튼 영역 */}
      <div className='flex justify-between mt-4'>
        {/* 미리보기 토글 버튼 */}
        <button
          onClick={() => setShowPreview(!showPreview)} // 미리보기 모드 토글
          className='px-4 py-2 bg-gray-500 text-white rounded flex items-center gap-2 hover:bg-gray-600 transition-colors'
        >
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          {showPreview ? '편집 모드' : '미리보기'}
        </button>

        {/* 저장 버튼 */}
        <button
          onClick={handleSave} // 저장 함수 실행
          className='px-6 py-2 bg-blue-500 text-white rounded flex items-center gap-2 hover:bg-blue-600 transition-colors'
        >
          <Save size={16} />
          저장
        </button>
      </div>

      {/* 미리보기 영역 */}
      {showPreview && (
        <div className='mt-6 p-4 border rounded-lg bg-gray-50'>
          <h3 className='text-lg font-bold mb-2'>미리보기</h3>
          <div
            className='prose prose-lg max-w-none'
            dangerouslySetInnerHTML={{ __html: getHTMLContent() }} // HTML 내용 렌더링
          />
        </div>
      )}
    </div>
  );
}
