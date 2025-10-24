'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import dynamic from 'next/dynamic'; // 동적 임포트를 위한 Next.js 훅
import { useState } from 'react'; // React 상태 관리를 위한 훅
import { EditorState } from '@/types/blog'; // 타입 정의 임포트

// 동적 임포트로 SSR 문제 해결
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

/**
 * 블로그 에디터 컴포넌트
 * - 제목과 내용을 분리하여 관리
 * - 미리보기/편집 모드 토글
 * - 저장 기능
 */
export default function BlogEditor() {
  // 에디터 상태를 관리하는 객체
  const [editorState, setEditorState] = useState<EditorState>({
    title: '', // 블로그 제목
    content: '', // 블로그 내용 (마크다운)
    isPreview: false, // 미리보기 모드 여부
  });

  /**
   * 저장 버튼 클릭 시 실행되는 함수
   * 현재는 콘솔에 로그만 출력 (실제 저장 로직은 추후 구현)
   */
  const handleSave = () => {
    // 저장 로직 구현
    console.log('저장:', editorState);
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      {/* 제목 입력 영역 */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          value={editorState.title}
          onChange={e =>
            setEditorState(prev => ({
              ...prev,
              title: e.target.value, // 제목 상태 업데이트
            }))
          }
          className='w-full text-2xl font-bold border-none outline-none'
        />
      </div>

      {/* 마크다운 에디터 영역 */}
      <div className='border rounded-lg overflow-hidden'>
        <MDEditor
          value={editorState.content}
          onChange={value =>
            setEditorState(prev => ({
              ...prev,
              content: value || '', // 내용 상태 업데이트 (null 체크)
            }))
          }
          preview={editorState.isPreview ? 'preview' : 'edit'} // 미리보기 모드 설정
          height={600}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div className='flex justify-between mt-4'>
        {/* 미리보기/편집 모드 토글 버튼 */}
        <button
          onClick={() =>
            setEditorState(prev => ({
              ...prev,
              isPreview: !prev.isPreview, // 미리보기 모드 토글
            }))
          }
          className='px-4 py-2 bg-gray-500 text-white rounded'
        >
          {editorState.isPreview ? '편집 모드' : '미리보기'}
        </button>

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          className='px-6 py-2 bg-blue-500 text-white rounded'
        >
          저장
        </button>
      </div>
    </div>
  );
}
