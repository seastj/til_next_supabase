'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import dynamic from 'next/dynamic'; // 동적 임포트를 위한 Next.js 훅
import { useState } from 'react'; // React 상태 관리를 위한 훅

// 동적 임포트로 SSR 문제 해결
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

/**
 * 이미지 삽입 가이드 에디터 컴포넌트
 * - 이미지 삽입 방법 설명
 * - 실제 예제 코드 포함
 * - 툴바 사용법 안내
 */
export default function ImageEditor() {
  // 에디터 내용을 관리하는 상태
  // 초기값: 이미지 삽입 가이드 마크다운 텍스트
  const [value, setValue] = useState(`# 이미지 삽입 가이드

## 1. 기본 이미지 삽입 방법

### 방법 1: 툴바 사용
1. 툴바에서 이미지 아이콘(🖼️) 클릭
2. 이미지 URL 입력
3. Alt 텍스트 입력 (선택사항)
4. 확인 버튼 클릭

### 방법 2: 직접 마크다운 문법 작성
\`\`\`markdown
![Alt 텍스트](이미지URL "제목")
\`\`\`

## 2. 실제 예제

### 온라인 이미지
![React 로고](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg "React Logo")

### 로컬 이미지 (public 폴더)
![Next.js 로고](/next.svg "Next.js Logo")

### 이미지에 링크 추가
[![React 로고](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)](https://reactjs.org)

## 3. 이미지 크기 조절 (HTML 사용)
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width="100" height="100">

## 4. 이미지 정렬
<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="중앙 정렬" width="200">
</div>

## 5. 이미지 갤러리
<div style="display: flex; gap: 10px;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="100">
  <img src="/next.svg" alt="Next.js" width="100">
  <img src="/vercel.svg" alt="Vercel" width="100">
</div>`);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>이미지 삽입 가이드</h2>

      {/* 사용 방법 안내 박스 */}
      <div className='mb-4 p-4 bg-blue-50 rounded-lg'>
        <h3 className='font-bold text-blue-800 mb-2'>📝 사용 방법:</h3>
        <ol className='list-decimal list-inside space-y-1 text-sm'>
          <li>툴바에서 이미지 아이콘(🖼️) 클릭</li>
          <li>이미지 URL 입력 (예: https://example.com/image.jpg)</li>
          <li>Alt 텍스트 입력 (접근성을 위한 설명)</li>
          <li>제목 입력 (선택사항, 마우스 오버 시 표시)</li>
          <li>확인 버튼 클릭</li>
        </ol>
      </div>

      {/* 마크다운 에디터 with 이미지 가이드 */}
      <MDEditor
        value={value} // 현재 에디터 내용 (이미지 가이드)
        onChange={setValue} // 내용 변경 시 상태 업데이트
        height={600} // 에디터 높이 600px
        data-color-mode='light' // 라이트 모드로 고정
      />
    </div>
  );
}
