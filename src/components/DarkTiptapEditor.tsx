'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import { useEditor, EditorContent } from '@tiptap/react'; // Tiptap React 훅과 컴포넌트
import StarterKit from '@tiptap/starter-kit'; // 기본 확장 패키지
import { useState } from 'react'; // React 상태 관리
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Moon,
  Sun,
} from 'lucide-react'; // 아이콘 라이브러리

/**
 * 다크 모드 Tiptap 에디터 컴포넌트
 * - 라이트/다크 테마 전환
 * - 테마별 스타일링
 * - 조건부 렌더링
 */
export default function DarkTiptapEditor() {
  // 다크 모드 상태 관리
  const [isDark, setIsDark] = useState(false);

  // 테마에 따라 스타일이 변경되는 에디터 인스턴스
  const editor = useEditor({
    extensions: [StarterKit], // 기본 확장 패키지
    content: '<p>다크 모드 에디터입니다.</p>', // 초기 내용
    immediatelyRender: false, // SSR hydration 불일치 방지
    editorProps: {
      attributes: {
        class: `prose ${isDark ? 'prose-invert' : ''} mx-auto focus:outline-none`, // 테마별 prose 클래스
      },
    },
  });

  return (
    <div
      className={`max-w-4xl mx-auto p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white'}`}
    >
      <h2 className='text-2xl font-bold mb-4'>다크 모드 Tiptap 에디터</h2>

      {/* 테마 토글 버튼 */}
      <button
        onClick={() => setIsDark(!isDark)} // 다크 모드 상태 토글
        className='mb-4 px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 hover:bg-blue-600 transition-colors'
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
        {isDark ? '라이트 모드' : '다크 모드'}
      </button>

      {/* 테마별 스타일이 적용되는 에디터 컨테이너 */}
      <div
        className={`border rounded-lg ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
      >
        {/* 툴바 영역 */}
        <div className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className='flex flex-wrap gap-1'>
            {/* 굵은 글씨 버튼 */}
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('bold')
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='굵은 글씨 (Ctrl+B)'
            >
              <Bold size={16} />
            </button>

            {/* 기울임 버튼 */}
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('italic')
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='기울임 (Ctrl+I)'
            >
              <Italic size={16} />
            </button>

            {/* 취소선 버튼 */}
            <button
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('strike')
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='취소선'
            >
              <Strikethrough size={16} />
            </button>

            {/* 구분선 */}
            <div
              className={`w-px h-8 mx-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}
            ></div>

            {/* 제목 버튼들 */}
            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`p-2 rounded transition-colors ${
                editor?.isActive('heading', { level: 1 })
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='제목 1'
            >
              <Heading1 size={16} />
            </button>

            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`p-2 rounded transition-colors ${
                editor?.isActive('heading', { level: 2 })
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='제목 2'
            >
              <Heading2 size={16} />
            </button>

            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`p-2 rounded transition-colors ${
                editor?.isActive('heading', { level: 3 })
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='제목 3'
            >
              <Heading3 size={16} />
            </button>

            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={`p-2 rounded transition-colors ${
                editor?.isActive('heading', { level: 4 })
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='제목 4'
            >
              <Heading4 size={16} />
            </button>

            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 5 }).run()
              }
              className={`p-2 rounded transition-colors ${
                editor?.isActive('heading', { level: 5 })
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='제목 5'
            >
              <Heading5 size={16} />
            </button>

            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 6 }).run()
              }
              className={`p-2 rounded transition-colors ${
                editor?.isActive('heading', { level: 6 })
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='제목 6'
            >
              <Heading6 size={16} />
            </button>

            {/* 코드 블록 */}
            <button
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('codeBlock')
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='코드 블록'
            >
              <Code size={16} />
            </button>

            {/* 구분선 */}
            <div
              className={`w-px h-8 mx-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}
            ></div>

            {/* 목록 버튼들 */}
            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('bulletList')
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='순서 없는 목록'
            >
              <List size={16} />
            </button>

            <button
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('orderedList')
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='순서 있는 목록'
            >
              <ListOrdered size={16} />
            </button>

            {/* 인용 */}
            <button
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('blockquote')
                  ? 'bg-blue-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
              title='인용'
            >
              <Quote size={16} />
            </button>

            {/* 구분선 */}
            <div
              className={`w-px h-8 mx-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}
            ></div>

            {/* 실행 취소/다시 실행 */}
            <button
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
              className={`p-2 rounded transition-colors ${
                editor?.can().undo()
                  ? isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
                  : 'text-gray-500'
              }`}
              title='실행 취소 (Ctrl+Z)'
            >
              <Undo size={16} />
            </button>

            <button
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
              className={`p-2 rounded transition-colors ${
                editor?.can().redo()
                  ? isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
                  : 'text-gray-500'
              }`}
              title='다시 실행 (Ctrl+Y)'
            >
              <Redo size={16} />
            </button>
          </div>
        </div>

        {/* 에디터 내용 영역 */}
        <div
          className={`p-4 min-h-[300px] ${isDark ? 'bg-gray-900' : 'bg-white'}`}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
