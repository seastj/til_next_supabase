'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import dynamic from 'next/dynamic'; // 동적 임포트를 위한 Next.js 훅
import { useState } from 'react'; // React 상태 관리를 위한 훅

// 동적 임포트로 SSR 문제 해결
// @uiw/react-md-editor는 브라우저에서만 작동하므로 SSR을 비활성화
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

/**
 * 기본 마크다운 에디터 컴포넌트
 * - 실시간 미리보기 기능
 * - 마크다운 문법 지원
 * - 기본 툴바 제공
 */
export default function MarkdownEditor() {
  // 에디터의 내용을 관리하는 상태
  // 초기값: '**Hello world!!!**' (굵은 글씨 마크다운 문법)
  const [value, setValue] = useState('**Hello world!!!**');

  return (
    <div className='container'>
      {/* 마크다운 에디터 컴포넌트 */}
      <MDEditor
        value={value} // 현재 에디터 내용
        onChange={setValue} // 내용 변경 시 상태 업데이트
        height={400} // 에디터 높이 400px
      />
    </div>
  );
}
