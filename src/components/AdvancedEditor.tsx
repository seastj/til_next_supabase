'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import dynamic from 'next/dynamic'; // 동적 임포트를 위한 Next.js 훅
import { useState } from 'react'; // React 상태 관리를 위한 훅

// 동적 임포트로 SSR 문제 해결
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

/**
 * 고급 마크다운 에디터 컴포넌트
 * - 미리보기 모드 전환 기능
 * - 편집/분할/미리보기 모드 지원
 * - 버튼을 통한 모드 제어
 */
export default function AdvancedEditor() {
  // 에디터 내용을 관리하는 상태
  // 초기값: '# Hello World' (마크다운 제목 문법)
  const [value, setValue] = useState('# Hello World');

  // 미리보기 모드를 관리하는 상태
  // TypeScript 제네릭으로 타입 안정성 보장
  const [preview, setPreview] = useState<'edit' | 'preview' | 'previewOnly'>(
    'edit' // 기본값: 편집 모드
  );

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>고급 에디터</h2>

      {/* 미리보기 모드 선택 버튼들 */}
      <div className='mb-4'>
        {/* 편집 모드 버튼 */}
        <button
          onClick={() => setPreview('edit')} // 편집 모드로 설정
          className={`px-4 py-2 mr-2 rounded ${
            preview === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          편집 모드
        </button>

        {/* 분할 모드 버튼 */}
        <button
          onClick={() => setPreview('preview')} // 분할 모드로 설정
          className={`px-4 py-2 mr-2 rounded ${
            preview === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          분할 모드
        </button>

        {/* 미리보기만 버튼 */}
        <button
          onClick={() => setPreview('previewOnly')} // 미리보기만 모드로 설정
          className={`px-4 py-2 rounded ${
            preview === 'previewOnly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          미리보기만
        </button>
      </div>

      {/* 마크다운 에디터 */}
      <MDEditor
        value={value} // 현재 에디터 내용
        onChange={setValue} // 내용 변경 시 상태 업데이트
        preview={preview} // 현재 선택된 미리보기 모드
        height={500} // 에디터 높이 500px
      />
    </div>
  );
}
