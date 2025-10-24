'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import dynamic from 'next/dynamic'; // 동적 임포트를 위한 Next.js 훅
import { useState } from 'react'; // React 상태 관리를 위한 훅
import '@uiw/react-md-editor/markdown-editor.css'; // 에디터 기본 스타일 임포트

// 동적 임포트로 SSR 문제 해결
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

/**
 * 다크 모드 에디터 컴포넌트
 * - 라이트/다크 테마 전환 기능
 * - HTML data 속성을 통한 테마 적용
 * - 조건부 렌더링으로 버튼 텍스트 변경
 */
export default function DarkModeEditor() {
  // 에디터 내용을 관리하는 상태
  const [value, setValue] = useState('');

  // 테마 상태를 관리 (라이트/다크)
  // TypeScript 제네릭으로 타입 안정성 보장
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className='max-w-4xl mx-auto p-6' data-color-mode={theme}>
      <h2 className='text-2xl font-bold mb-4'>다크 모드 에디터</h2>

      {/* 테마 토글 버튼 */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} // 테마 상태 토글
        className='mb-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        {/* 조건부 렌더링: 현재 테마에 따라 버튼 텍스트 변경 */}
        {theme === 'light' ? '다크 모드' : '라이트 모드'}
      </button>

      {/* 마크다운 에디터 with 테마 적용 */}
      <MDEditor
        value={value} // 현재 에디터 내용
        onChange={setValue} // 내용 변경 시 상태 업데이트
        data-color-mode={theme} // HTML data 속성으로 테마 적용
      />
    </div>
  );
}
