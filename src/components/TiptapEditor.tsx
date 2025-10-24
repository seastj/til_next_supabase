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
} from 'lucide-react'; // 아이콘 라이브러리

/**
 * 기본 Tiptap 에디터 컴포넌트
 * - WYSIWYG 에디터 기능
 * - 기본 서식 도구 제공
 * - 실시간 편집 및 미리보기
 */
export default function TiptapEditor() {
  // 에디터 인스턴스를 생성하고 관리
  const editor = useEditor({
    extensions: [StarterKit], // 기본 확장 패키지 사용
    content: '<p>Hello <strong>World</strong>!</p>', // 초기 내용 (HTML 형식)
    immediatelyRender: false, // SSR hydration 불일치 방지
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none', // Tailwind CSS 스타일링
      },
    },
  });

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Tiptap 기본 에디터</h2>

      {/* 에디터 툴바 */}
      <div className='border border-gray-300 rounded-t-lg p-2 bg-gray-50'>
        <div className='flex flex-wrap gap-1'>
          {/* 굵은 글씨 버튼 */}
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

          {/* 기울임 버튼 */}
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

          {/* 취소선 버튼 */}
          <button
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('strike')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='취소선'
          >
            <Strikethrough size={16} />
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

          {/* 코드 블록 버튼 */}
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('codeBlock')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='코드 블록'
          >
            <Code size={16} />
          </button>

          {/* 구분선 */}
          <div className='w-px h-8 bg-gray-300 mx-1'></div>

          {/* 순서 없는 목록 */}
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('bulletList')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='순서 없는 목록'
          >
            <List size={16} />
          </button>

          {/* 순서 있는 목록 */}
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('orderedList')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='순서 있는 목록'
          >
            <ListOrdered size={16} />
          </button>

          {/* 인용 */}
          <button
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('blockquote')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='인용'
          >
            <Quote size={16} />
          </button>

          {/* 구분선 */}
          <div className='w-px h-8 bg-gray-300 mx-1'></div>

          {/* 실행 취소 */}
          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.can().undo() ? 'text-gray-700' : 'text-gray-400'
            }`}
            title='실행 취소 (Ctrl+Z)'
          >
            <Undo size={16} />
          </button>

          {/* 다시 실행 */}
          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.can().redo() ? 'text-gray-700' : 'text-gray-400'
            }`}
            title='다시 실행 (Ctrl+Y)'
          >
            <Redo size={16} />
          </button>
        </div>
      </div>

      {/* 에디터 내용 영역 */}
      <div className='border border-gray-300 border-t-0 rounded-b-lg min-h-[300px] p-4'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
