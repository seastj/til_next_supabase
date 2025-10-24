'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import dynamic from 'next/dynamic'; // 동적 임포트를 위한 Next.js 훅
import { useState } from 'react'; // React 상태 관리를 위한 훅

// 동적 임포트로 SSR 문제 해결
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

/**
 * 커스텀 툴바 에디터 컴포넌트
 * - 선택된 툴바 기능들만 표시
 * - 마크다운 문법별 툴바 구성
 * - require()를 사용한 동적 명령어 로딩
 */
export default function CustomToolbarEditor() {
  // 에디터 내용을 관리하는 상태
  const [value, setValue] = useState('');

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>커스텀 툴바 에디터</h2>

      {/* 마크다운 에디터 with 커스텀 툴바 */}
      <MDEditor
        value={value} // 현재 에디터 내용
        onChange={setValue} // 내용 변경 시 상태 업데이트
        height={500} // 에디터 높이 500px
        commands={[
          // 커스텀 툴바 명령어 배열
          // 기본 텍스트 서식
          require('@uiw/react-md-editor').commands.bold, // **굵은 글씨**
          require('@uiw/react-md-editor').commands.italic, // *기울임*
          require('@uiw/react-md-editor').commands.strikethrough, // ~~취소선~~
          require('@uiw/react-md-editor').commands.divider, // 툴바 구분선

          // 제목
          require('@uiw/react-md-editor').commands.title, // # 제목
          require('@uiw/react-md-editor').commands.divider, // 툴바 구분선

          // 링크 및 인용
          require('@uiw/react-md-editor').commands.link, // [링크](URL)
          require('@uiw/react-md-editor').commands.quote, // > 인용
          require('@uiw/react-md-editor').commands.divider, // 툴바 구분선

          // 코드
          require('@uiw/react-md-editor').commands.code, // `인라인 코드`
          require('@uiw/react-md-editor').commands.codeBlock, // ```코드 블록```
          require('@uiw/react-md-editor').commands.divider, // 툴바 구분선

          // 리스트
          require('@uiw/react-md-editor').commands.unorderedListCommand, // - 순서 없는 목록
          require('@uiw/react-md-editor').commands.orderedListCommand, // 1. 순서 있는 목록
          require('@uiw/react-md-editor').commands.checkedListCommand, // - [ ] 체크리스트
        ]}
      />
    </div>
  );
}
