# 📝 마크다운 & Tiptap 에디터 수업

## 🎯 학습 목표

이 수업을 통해 다음을 학습할 수 있습니다:

### 📚 마크다운 에디터 (@uiw/react-md-editor)

- **기본 사용법**: 마크다운 에디터 설치 및 기본 설정
- **고급 기능**: 미리보기, 커스텀 툴바, 다크 모드
- **실무 적용**: 블로그 에디터, 이미지 삽입 가이드
- **문제 해결**: 일반적인 에러 및 해결 방법

### 🚀 Tiptap 에디터

- **기본 사용법**: Tiptap 에디터 설치 및 기본 설정
- **확장 기능**: 이미지, 링크, 색상, 정렬 등 고급 기능
- **아이콘 툴바**: Lucide React를 활용한 직관적인 툴바
- **완전한 에디터**: 모든 기능이 포함된 전문적인 에디터
- **파일 업로드**: 로컬 파일 업로드 + URL 입력 지원

## 🏗️ 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 메인 페이지 (모든 에디터 예제)
│   ├── blog/
│   │   └── page.tsx          # 블로그 에디터 전용 페이지
│   └── layout.tsx            # 앱 레이아웃
├── components/
│   ├── ui/
│   │   └── button.tsx        # Shadcn UI 버튼 컴포넌트
│   ├── MarkdownEditor.tsx    # 기본 마크다운 에디터
│   ├── BlogEditor.tsx        # 블로그용 마크다운 에디터
│   ├── AdvancedEditor.tsx    # 고급 마크다운 에디터
│   ├── CustomToolbarEditor.tsx # 커스텀 툴바 에디터
│   ├── DarkModeEditor.tsx    # 다크 모드 에디터
│   ├── ImageEditor.tsx       # 이미지 삽입 가이드
│   ├── TiptapEditor.tsx      # 기본 Tiptap 에디터
│   ├── AdvancedTiptapEditor.tsx # 고급 Tiptap 에디터
│   ├── DarkTiptapEditor.tsx  # 다크 모드 Tiptap 에디터
│   ├── TiptapBlogEditor.tsx  # 블로그용 Tiptap 에디터
│   └── FullFeaturedTiptapEditor.tsx # 완전한 기능 에디터
├── hooks/
│   ├── usePosts.ts           # 포스트 관련 훅
│   ├── useTodos.ts           # 할일 관련 훅
│   ├── useUsers.ts           # 사용자 관련 훅
│   └── useQueryIntegration.ts # React Query 통합 훅
├── lib/
│   ├── api.ts                # API 관련 유틸리티
│   ├── query-client.ts       # React Query 클라이언트 설정
│   └── utils.ts              # 공통 유틸리티
├── stores/
│   ├── CounterStore.ts       # 카운터 상태 관리
│   ├── TodoStore.ts          # 할일 상태 관리
│   ├── UserStore.ts        # 사용자 상태 관리
│   ├── ThemeStore.ts         # 테마 상태 관리
│   └── queryStore.ts         # 쿼리 상태 관리
└── types/
    └── types.ts              # TypeScript 타입 정의
```

## 🛠️ 기술 스택

### Frontend

- **Next.js 14**: App Router, SSR/SSG 지원
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성 보장
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크

### 에디터 라이브러리

- **@uiw/react-md-editor**: 마크다운 에디터
- **@tiptap/core**: Tiptap 코어 라이브러리
- **@tiptap/react**: Tiptap React 통합
- **@tiptap/starter-kit**: 기본 확장 패키지

### 확장 기능

- **@tiptap/extension-image**: 이미지 삽입
- **@tiptap/extension-link**: 링크 삽입
- **@tiptap/extension-color**: 글자색상
- **@tiptap/extension-text-style**: 텍스트 스타일
- **@tiptap/extension-text-align**: 텍스트 정렬
- **@tiptap/extension-highlight**: 하이라이트
- **@tiptap/extension-underline**: 밑줄
- **@tiptap/extension-superscript**: 위첨자
- **@tiptap/extension-subscript**: 아래첨자

### UI/UX

- **Lucide React**: 아이콘 라이브러리
- **Shadcn UI**: 컴포넌트 라이브러리
- **Radix UI**: 접근성 우선 컴포넌트

### 상태 관리

- **Zustand**: 경량 상태 관리
- **React Query**: 서버 상태 관리
- **React Hooks**: 로컬 상태 관리

## 📋 목차

1. [마크다운 에디터 설치 및 기본 사용법](#-1-마크다운-에디터-설치)
2. [마크다운 에디터 고급 기능](#-2-마크다운-에디터-고급-기능)
3. [마크다운 에디터 실무 프로젝트](#-3-마크다운-에디터-실무-프로젝트)
4. [Tiptap 에디터 설치 및 기본 사용법](#-1-tiptap-에디터-설치)
5. [Tiptap 에디터 고급 기능](#-2-tiptap-고급-기능)
6. [Tiptap 에디터 완전한 에디터](#-3-tiptap-완전한-에디터)
7. [트러블슈팅](#-4-트러블슈팅)
8. [실행 방법](#-5-실행-방법)
9. [학습 과제](#-6-학습-과제)
10. [추가 자료](#-7-추가-자료)

## 🛠️ 1. 설치 과정

### 1.1 패키지 설치

```bash
npm install @uiw/react-md-editor
```

### 1.2 TypeScript 타입 정의 (선택사항)

```bash
npm install --save-dev @types/marked
```

### 1.3 설치 확인

`package.json`에서 설치된 패키지 확인:

```json
{
  "dependencies": {
    "@uiw/react-md-editor": "^4.0.8"
  }
}
```

## 🚀 2. 기본 사용법

### 2.1 기본 컴포넌트 생성

**파일 경로**: `src/components/MarkdownEditor.tsx`

#### 📝 코드 설명:

```tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// 동적 임포트로 SSR 문제 해결
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function MarkdownEditor() {
  const [value, setValue] = useState('**Hello world!!!**');

  return (
    <div className='container'>
      <MDEditor value={value} onChange={setValue} height={400} />
    </div>
  );
}
```

#### 🔍 각 부분 상세 설명:

1. **`'use client'`**: Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시
2. **`dynamic()`**: 서버사이드 렌더링(SSR) 문제를 해결하기 위한 동적 임포트
3. **`useState('**Hello world!!!**')`**: 에디터의 초기값 설정 (마크다운 문법 포함)
4. **`value={value}`**: 에디터에 표시될 내용
5. **`onChange={setValue}`**: 내용이 변경될 때마다 상태 업데이트
6. **`height={400}`**: 에디터의 높이를 400px로 설정

#### 🎯 학습 목표:

- 마크다운 에디터의 기본 구조 이해
- React 상태 관리 (useState) 활용
- Next.js 동적 임포트 사용법

### 2.2 페이지에 추가

**파일 경로**: `src/app/page.tsx`

#### 📝 코드 설명:

```tsx
import MarkdownEditor from '@/components/MarkdownEditor';

export default function Home() {
  return (
    <main className='p-8'>
      <h1 className='text-3xl font-bold mb-6'>마크다운 에디터</h1>
      <MarkdownEditor />
    </main>
  );
}
```

#### 🔍 각 부분 상세 설명:

1. **`import MarkdownEditor`**: 앞서 생성한 컴포넌트를 가져오기
2. **`export default function Home()`**: Next.js App Router의 기본 페이지 컴포넌트
3. **`className='p-8'`**: Tailwind CSS로 패딩 8 (32px) 적용
4. **`className='text-3xl font-bold mb-6'`**:
   - `text-3xl`: 텍스트 크기 3xl (30px)
   - `font-bold`: 굵은 글씨
   - `mb-6`: 하단 마진 6 (24px)

#### 🎯 학습 목표:

- Next.js App Router 페이지 구조 이해
- 컴포넌트 임포트 및 사용법
- Tailwind CSS 클래스 활용

## 🎨 3. 고급 기능 구현

### 3.1 미리보기 모드 설정

**파일 경로**: `src/components/AdvancedEditor.tsx`

#### 📝 코드 설명:

```tsx
import MDEditor from '@uiw/react-md-editor';

function AdvancedEditor() {
  const [value, setValue] = useState('# Hello World');
  const [preview, setPreview] = useState<'edit' | 'preview' | 'previewOnly'>(
    'edit'
  );

  return (
    <MDEditor
      value={value}
      onChange={setValue}
      preview={preview}
      height={500}
    />
  );
}
```

#### 🔍 각 부분 상세 설명:

1. **`useState('# Hello World')`**: 마크다운 제목 문법으로 초기값 설정
2. **`useState<'edit' | 'preview' | 'previewOnly'>('edit')`**:
   - TypeScript 제네릭으로 미리보기 모드 타입 정의
   - `'edit'`: 편집 모드만 표시
   - `'preview'`: 편집과 미리보기 분할 표시
   - `'previewOnly'`: 미리보기만 표시
3. **`preview={preview}`**: 현재 선택된 미리보기 모드 적용

#### 🎯 학습 목표:

- TypeScript 제네릭 타입 활용
- 미리보기 모드 상태 관리
- 마크다운 문법 이해 (# 제목)

### 3.2 커스텀 툴바

**파일 경로**: `src/components/CustomToolbarEditor.tsx`

#### 📝 코드 설명:

```tsx
import MDEditor, { commands } from '@uiw/react-md-editor';

function CustomToolbarEditor() {
  const [value, setValue] = useState('');

  return (
    <MDEditor
      value={value}
      onChange={setValue}
      commands={[
        commands.bold, // 굵은 글씨
        commands.italic, // 기울임
        commands.strikethrough, // 취소선
        commands.divider, // 구분선
        commands.title, // 제목
        commands.divider, // 구분선
        commands.link, // 링크
        commands.quote, // 인용
        commands.code, // 인라인 코드
        commands.codeBlock, // 코드 블록
        commands.divider, // 구분선
        commands.unorderedListCommand, // 순서 없는 목록
        commands.orderedListCommand, // 순서 있는 목록
        commands.checkedListCommand, // 체크리스트
      ]}
    />
  );
}
```

#### 🔍 각 부분 상세 설명:

1. **`import { commands }`**: 에디터에서 제공하는 툴바 명령어들 가져오기
2. **`commands.bold`**: **굵은 글씨** 버튼
3. **`commands.italic`**: _기울임_ 버튼
4. **`commands.strikethrough`**: ~~취소선~~ 버튼
5. **`commands.divider`**: 툴바 구분선 (시각적 분리)
6. **`commands.title`**: # 제목 버튼
7. **`commands.link`**: [링크](URL) 버튼
8. **`commands.quote`**: > 인용 버튼
9. **`commands.code`**: `인라인 코드` 버튼
10. **`commands.codeBlock`**: `코드 블록` 버튼
11. **`commands.unorderedListCommand`**: - 목록 버튼
12. **`commands.orderedListCommand`**: 1. 목록 버튼
13. **`commands.checkedListCommand`**: - [ ] 체크리스트 버튼

#### 🎯 학습 목표:

- 툴바 커스터마이징 방법
- 마크다운 문법과 툴바 버튼의 관계
- 배열을 활용한 동적 툴바 구성

### 3.3 다크 모드 지원

**파일 경로**: `src/components/DarkModeEditor.tsx`

#### 📝 코드 설명:

```tsx
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';

function DarkModeEditor() {
  const [value, setValue] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div data-color-mode={theme}>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className='mb-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        {theme === 'light' ? '다크 모드' : '라이트 모드'}
      </button>
      <MDEditor value={value} onChange={setValue} data-color-mode={theme} />
    </div>
  );
}
```

#### 🔍 각 부분 상세 설명:

1. **`import '@uiw/react-md-editor/markdown-editor.css'`**: 에디터의 기본 스타일 가져오기
2. **`useState<'light' | 'dark'>('light')`**: 테마 상태를 TypeScript로 타입 정의
3. **`data-color-mode={theme}`**: HTML data 속성으로 테마 적용
4. **`onClick={() => setTheme(...)}`**: 버튼 클릭 시 테마 토글
5. **`theme === 'light' ? '다크 모드' : '라이트 모드'`**: 조건부 렌더링으로 버튼 텍스트 변경
6. **`className='mb-4 px-4 py-2 bg-blue-500 text-white rounded'`**:
   - `mb-4`: 하단 마진 4 (16px)
   - `px-4 py-2`: 좌우 패딩 4, 상하 패딩 2
   - `bg-blue-500`: 파란색 배경
   - `text-white`: 흰색 텍스트
   - `rounded`: 둥근 모서리

#### 🎯 학습 목표:

- CSS 모듈 임포트 방법
- HTML data 속성 활용
- 조건부 렌더링과 상태 토글
- Tailwind CSS 스타일링

### 3.4 이미지 삽입 방법

**파일 경로**: `src/components/ImageEditor.tsx`

#### 📝 툴바를 사용한 이미지 삽입 (단계별):

1. **툴바에서 이미지 아이콘(🖼️) 클릭**
   - 툴바에서 이미지 삽입 버튼을 찾아 클릭
   - 팝업 창이 나타남

2. **이미지 URL 입력** (예: `https://example.com/image.jpg`)
   - 온라인 이미지의 전체 URL 입력
   - 로컬 이미지는 `/이미지명.확장자` 형식

3. **Alt 텍스트 입력** (접근성을 위한 설명)
   - 시각 장애인을 위한 스크린 리더 설명
   - 이미지가 로드되지 않을 때 표시될 텍스트

4. **제목 입력** (선택사항, 마우스 오버 시 표시)
   - 마우스를 올렸을 때 나타나는 툴팁 텍스트

5. **확인 버튼 클릭**
   - 마크다운 문법이 자동으로 삽입됨

#### 📝 마크다운 문법으로 직접 작성:

```markdown
![Alt 텍스트](이미지URL '제목')
```

**구문 설명:**

- `!`: 이미지임을 나타내는 마크다운 문법
- `[Alt 텍스트]`: 대체 텍스트 (필수)
- `(이미지URL)`: 이미지 경로 (필수)
- `'제목'`: 툴팁 제목 (선택사항)

#### 📝 실제 예제:

```markdown
<!-- 1. 기본 온라인 이미지 -->

![React 로고](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg 'React Logo')

<!-- 2. 로컬 이미지 (public 폴더에 저장) -->

![Next.js 로고](/next.svg 'Next.js Logo')

<!-- 3. 이미지에 링크 추가 (클릭 가능한 이미지) -->

[![React 로고](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)](https://reactjs.org)

<!-- 4. HTML로 크기 조절 (마크다운 한계 극복) -->
<img src="이미지URL" alt="설명" width="200" height="200">

<!-- 5. 이미지 정렬 (HTML 사용) -->
<div align="center">
  <img src="이미지URL" alt="중앙 정렬" width="300">
</div>
```

#### 🎯 학습 목표:

- 마크다운 이미지 문법 이해
- 접근성(Alt 텍스트)의 중요성
- 온라인 vs 로컬 이미지 경로 차이
- HTML과 마크다운 혼용 방법

## 📝 4. 실습 프로젝트: 블로그 에디터

### 4.1 프로젝트 구조

```
src/
├── components/
│   ├── MarkdownEditor.tsx          # 기본 마크다운 에디터
│   ├── BlogEditor.tsx              # 블로그 에디터 (제목 + 내용)
│   ├── AdvancedEditor.tsx         # 고급 에디터 (미리보기 모드)
│   ├── CustomToolbarEditor.tsx     # 커스텀 툴바 에디터
│   ├── DarkModeEditor.tsx          # 다크 모드 에디터
│   └── ImageEditor.tsx            # 이미지 삽입 가이드
├── types/
│   └── blog.ts                     # 타입 정의
├── app/
│   ├── page.tsx                    # 메인 페이지 (모든 에디터 예제)
│   └── blog/
│       └── page.tsx                # 블로그 전용 페이지
└── README.md                       # 수업 가이드
```

### 4.2 타입 정의

**파일 경로**: `src/types/blog.ts`

```tsx
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditorState {
  title: string;
  content: string;
  isPreview: boolean;
}
```

### 4.3 블로그 에디터 컴포넌트

**파일 경로**: `src/components/BlogEditor.tsx`

```tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { EditorState } from '@/types/blog';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function BlogEditor() {
  const [editorState, setEditorState] = useState<EditorState>({
    title: '',
    content: '',
    isPreview: false,
  });

  const handleSave = () => {
    // 저장 로직 구현
    console.log('저장:', editorState);
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          value={editorState.title}
          onChange={e =>
            setEditorState(prev => ({
              ...prev,
              title: e.target.value,
            }))
          }
          className='w-full text-2xl font-bold border-none outline-none'
        />
      </div>

      <div className='border rounded-lg overflow-hidden'>
        <MDEditor
          value={editorState.content}
          onChange={value =>
            setEditorState(prev => ({
              ...prev,
              content: value || '',
            }))
          }
          preview={editorState.isPreview ? 'preview' : 'edit'}
          height={600}
        />
      </div>

      <div className='flex justify-between mt-4'>
        <button
          onClick={() =>
            setEditorState(prev => ({
              ...prev,
              isPreview: !prev.isPreview,
            }))
          }
          className='px-4 py-2 bg-gray-500 text-white rounded'
        >
          {editorState.isPreview ? '편집 모드' : '미리보기'}
        </button>

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
```

## 🎯 5. 실습 과제

### 과제 1: 기본 에디터 구현

- 마크다운 에디터 컴포넌트 생성
- 실시간 미리보기 기능 구현
- 기본 툴바 기능 테스트

### 과제 2: 커스터마이징

- 다크/라이트 모드 토글 기능
- 커스텀 툴바 버튼 추가
- 에디터 높이 및 스타일 조정

### 과제 3: 데이터 관리

- 로컬 스토리지에 글 저장
- 글 목록 표시 기능
- 글 수정/삭제 기능

## 📚 6. 추가 학습 자료

### 유용한 링크

- [@uiw/react-md-editor 공식 문서](https://uiwjs.github.io/react-md-editor/)
- [마크다운 문법 가이드](https://www.markdownguide.org/basic-syntax/)
- [Next.js 동적 임포트](https://nextjs.org/docs/advanced-features/dynamic-import)

### 관련 라이브러리

- `@uiw/react-md-editor`: 메인 에디터
- `marked`: 마크다운 파싱
- `prismjs`: 코드 하이라이팅
- `katex`: 수학 공식 렌더링

## 🐛 7. 문제 해결

### 자주 발생하는 문제들

#### SSR 오류

```tsx
// 해결책: 동적 임포트 사용
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
```

#### 스타일이 적용되지 않는 문제

```tsx
// CSS 파일 임포트 추가
import '@uiw/react-md-editor/markdown-editor.css';
```

#### TypeScript 타입 오류

```tsx
// 타입 단언 사용
const value = editorValue as string;
```

#### onPreviewChange 오류

```tsx
// ❌ 잘못된 사용법 (더 이상 지원되지 않음)
<MDEditor
  value={value}
  onChange={setValue}
  preview={preview}
  onPreviewChange={setPreview}  // 이 속성은 제거
  height={500}
/>

// ✅ 올바른 사용법
<MDEditor
  value={value}
  onChange={setValue}
  preview={preview}
  height={500}
/>
```

## 🎉 8. 완성된 프로젝트 실행

### 8.1 프로젝트 실행

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

### 8.2 확인할 수 있는 페이지들

- **메인 페이지**: `http://localhost:3000` - 모든 에디터 예제 확인
- **블로그 페이지**: `http://localhost:3000/blog` - 블로그 에디터 전용 페이지

### 8.3 생성된 파일 목록

```
📁 src/
├── 📁 components/
│   ├── 📄 MarkdownEditor.tsx          # 기본 마크다운 에디터
│   ├── 📄 BlogEditor.tsx              # 블로그 에디터 (제목 + 내용)
│   ├── 📄 AdvancedEditor.tsx         # 고급 에디터 (미리보기 모드)
│   ├── 📄 CustomToolbarEditor.tsx     # 커스텀 툴바 에디터
│   ├── 📄 DarkModeEditor.tsx          # 다크 모드 에디터
│   └── 📄 ImageEditor.tsx            # 이미지 삽입 가이드
├── 📁 types/
│   └── 📄 blog.ts                     # 타입 정의
├── 📁 app/
│   ├── 📄 page.tsx                    # 메인 페이지 (모든 에디터 예제)
│   └── 📁 blog/
│       └── 📄 page.tsx                # 블로그 전용 페이지
└── 📄 README.md                       # 수업 가이드
```

브라우저에서 `http://localhost:3000`으로 접속하여 마크다운 에디터를 확인할 수 있습니다.

---

---

# Tiptap 에디터 수업 가이드

## 📚 Tiptap 에디터 개요

Tiptap은 현대적인 WYSIWYG 에디터로, 확장 가능하고 커스터마이징이 용이한 에디터입니다. React와 Next.js에서 강력한 리치 텍스트 에디터를 구현할 수 있습니다.

## 🛠️ 1. Tiptap 설치 과정

### 1.1 패키지 설치

```bash
npm install @tiptap/core @tiptap/react @tiptap/starter-kit
```

### 1.2 추가 확장 패키지 (필수)

```bash
# 이미지, 링크 등 고급 기능 (고급 에디터에서 사용)
npm install @tiptap/extension-image @tiptap/extension-link
```

### 1.3 모든 기능 확장 패키지 (완전한 에디터용)

```bash
# 색상, 정렬, 하이라이트 등 모든 고급 기능
npm install @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-text-align @tiptap/extension-highlight @tiptap/extension-underline @tiptap/extension-superscript @tiptap/extension-subscript
```

#### ⚠️ 중요: 확장 패키지 중복 문제 해결

Tiptap에서 중복 확장 에러를 방지하기 위해 StarterKit의 일부 확장을 비활성화해야 합니다:

```tsx
StarterKit.configure({
  // StarterKit에서 중복되는 확장들 비활성화
  link: false, // Link 확장을 별도로 설정
  underline: false, // Underline 확장을 별도로 설정
}),
```

### 1.4 아이콘 라이브러리 설치

```bash
# 툴바 아이콘을 위한 Lucide React 설치
npm install lucide-react
```

### 1.5 추가 확장 패키지 (선택사항)

```bash
# 테이블, 색상 등 더 많은 기능
npm install @tiptap/extension-table @tiptap/extension-color @tiptap/extension-text-style
```

### 1.6 설치 확인

`package.json`에서 설치된 패키지 확인:

```json
{
  "dependencies": {
    "@tiptap/core": "^2.x.x",
    "@tiptap/react": "^2.x.x",
    "@tiptap/starter-kit": "^2.x.x",
    "@tiptap/extension-image": "^2.x.x",
    "@tiptap/extension-link": "^2.x.x",
    "@tiptap/extension-color": "^2.x.x",
    "@tiptap/extension-text-style": "^2.x.x",
    "@tiptap/extension-text-align": "^2.x.x",
    "@tiptap/extension-highlight": "^2.x.x",
    "@tiptap/extension-underline": "^2.x.x",
    "@tiptap/extension-superscript": "^2.x.x",
    "@tiptap/extension-subscript": "^2.x.x",
    "lucide-react": "^0.x.x"
  }
}
```

## 🚀 2. Tiptap 기본 사용법

### 2.1 모든 기능이 포함된 완전한 Tiptap 에디터

#### 📁 파일 경로: `src/components/FullFeaturedTiptapEditor.tsx`

```tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { useState } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Highlighter,
  Code,
  List,
  ListOrdered,
  Quote,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Unlink,
  Undo,
  Redo,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function FullFeaturedTiptapEditor() {
  const [showPreview, setShowPreview] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // StarterKit에서 중복되는 확장들 비활성화
        link: false, // Link 확장을 별도로 설정
        underline: false, // Underline 확장을 별도로 설정
      }),
      TextStyle, // 텍스트 스타일 확장 (Color 확장보다 먼저)
      Color, // 글자색상
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline hover:text-blue-700',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true, // 여러 색상 하이라이트
      }),
      Underline, // 밑줄
      Superscript, // 위첨자
      Subscript, // 아래첨자
    ],
    content:
      '<p>모든 기능이 포함된 에디터입니다. 다양한 서식을 적용해보세요!</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg mx-auto focus:outline-none min-h-[500px]',
      },
    },
  });

  const handleColorChange = (color: string) => {
    editor?.chain().focus().setColor(color).run();
    setShowColorPicker(false);
  };

  const handleHighlightChange = (color: string) => {
    editor?.chain().focus().setHighlight({ color }).run();
    setShowHighlightPicker(false);
  };

  const colorPalette = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#FFC0CB',
    '#A52A2A',
    '#808080',
    '#000080',
    '#008000',
    '#FFD700',
    '#FF6347',
    '#40E0D0',
    '#EE82EE',
    '#90EE90',
  ];

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>
        모든 기능이 포함된 Tiptap 에디터
      </h2>

      {/* 확장된 툴바 */}
      <div className='border border-gray-300 rounded-t-lg p-2 bg-gray-50'>
        <div className='flex flex-wrap gap-1'>
          {/* 기본 서식 */}
          <button onClick={() => editor?.chain().focus().toggleBold().run()}>
            <Bold size={16} />
          </button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
            <Italic size={16} />
          </button>
          <button onClick={() => editor?.chain().focus().toggleStrike().run()}>
            <Strikethrough size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={16} />
          </button>

          {/* 제목 H1~H6 */}
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={16} />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 size={16} />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <Heading4 size={16} />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <Heading5 size={16} />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            <Heading6 size={16} />
          </button>

          {/* 텍스트 정렬 */}
          <button
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          >
            <AlignRight size={16} />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().setTextAlign('justify').run()
            }
          >
            <AlignJustify size={16} />
          </button>

          {/* 색상 및 하이라이트 */}
          <div className='relative'>
            <button onClick={() => setShowColorPicker(!showColorPicker)}>
              <Palette size={16} />
            </button>
            {showColorPicker && (
              <div className='absolute top-full left-0 mt-1 p-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]'>
                <div className='grid grid-cols-5 gap-2 mb-3'>
                  {colorPalette.map(color => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className='w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform shadow-sm'
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className='border-t pt-2'>
                  <label className='block text-xs text-gray-600 mb-1'>
                    커스텀 색상:
                  </label>
                  <input
                    type='color'
                    onChange={e => handleColorChange(e.target.value)}
                    className='w-full h-8 border border-gray-300 rounded cursor-pointer'
                  />
                </div>
              </div>
            )}
          </div>

          <div className='relative'>
            <button
              onClick={() => setShowHighlightPicker(!showHighlightPicker)}
            >
              <Highlighter size={16} />
            </button>
            {showHighlightPicker && (
              <div className='absolute top-full left-0 mt-1 p-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]'>
                <div className='grid grid-cols-5 gap-2 mb-3'>
                  {colorPalette.map(color => (
                    <button
                      key={color}
                      onClick={() => handleHighlightChange(color)}
                      className='w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform shadow-sm'
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className='border-t pt-2'>
                  <label className='block text-xs text-gray-600 mb-1'>
                    커스텀 색상:
                  </label>
                  <input
                    type='color'
                    onChange={e => handleHighlightChange(e.target.value)}
                    className='w-full h-8 border border-gray-300 rounded cursor-pointer'
                  />
                </div>
              </div>
            )}
          </div>

          {/* 목록 및 기타 */}
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          >
            <Code size={16} />
          </button>

          {/* 위첨자/아래첨자 */}
          <button
            onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          >
            <SuperscriptIcon size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleSubscript().run()}
          >
            <SubscriptIcon size={16} />
          </button>

          {/* 링크 및 이미지 */}
          <button
            onClick={() => {
              const url = window.prompt('URL을 입력하세요:');
              if (url) editor?.chain().focus().setLink({ href: url }).run();
            }}
          >
            <LinkIcon size={16} />
          </button>
          <button onClick={() => editor?.chain().focus().unsetLink().run()}>
            <Unlink size={16} />
          </button>
          <div className='relative'>
            <button onClick={() => setShowImageUpload(!showImageUpload)}>
              <ImageIcon size={16} />
            </button>

            {/* 이미지 업로드 모달 */}
            {showImageUpload && (
              <div className='absolute top-full left-0 mt-1 p-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[250px]'>
                <h4 className='text-sm font-medium text-gray-700 mb-3'>
                  이미지 추가
                </h4>

                {/* 파일 업로드 버튼 */}
                <button
                  onClick={handleFileButtonClick}
                  className='w-full mb-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm'
                >
                  📁 파일에서 선택
                </button>

                {/* URL 입력 버튼 */}
                <button
                  onClick={handleImageUrl}
                  className='w-full mb-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm'
                >
                  🔗 URL로 추가
                </button>

                {/* 취소 버튼 */}
                <button
                  onClick={() => setShowImageUpload(false)}
                  className='w-full px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm'
                >
                  취소
                </button>

                {/* 숨겨진 파일 입력 */}
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleFileSelect}
                  className='hidden'
                />
              </div>
            )}
          </div>

          {/* 실행 취소/다시 실행 */}
          <button onClick={() => editor?.chain().focus().undo().run()}>
            <Undo size={16} />
          </button>
          <button onClick={() => editor?.chain().focus().redo().run()}>
            <Redo size={16} />
          </button>
        </div>
      </div>

      {/* 에디터 내용 영역 */}
      <div className='border border-gray-300 border-t-0 rounded-b-lg min-h-[500px] p-4'>
        <EditorContent editor={editor} />
      </div>

      {/* 하단 버튼 영역 */}
      <div className='flex justify-between mt-4'>
        <button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          {showPreview ? '편집 모드' : '미리보기'}
        </button>
        <button
          onClick={() => {
            console.log(editor?.getHTML());
            alert('저장되었습니다!');
          }}
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
            dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}
          />
        </div>
      )}
    </div>
  );
}
```

#### 🎯 학습 목표:

- **완전한 에디터** 구현 방법
- **색상 및 하이라이트** 기능
- **텍스트 정렬** 기능
- **위첨자/아래첨자** 기능
- **고급 툴바** 디자인

#### ✨ 완전한 에디터의 특징:

- **글자색상**: 20가지 색상 팔레트 + 커스텀 색상
- **하이라이트**: 다양한 색상으로 텍스트 강조
- **텍스트 정렬**: 좌, 중앙, 우, 양쪽 정렬
- **위첨자/아래첨자**: 수학 공식이나 각주 작성
- **밑줄**: 기본 밑줄 기능
- **모든 제목 레벨**: H1~H6 완전 지원
- **고급 툴바**: 그룹핑된 기능별 버튼
- **이미지 업로드**: 파일 업로드 + URL 입력 지원

### 2.2 아이콘 툴바가 적용된 기본 Tiptap 에디터

#### 📁 파일 경로: `src/components/TiptapEditor.tsx`

```tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello <strong>World</strong>!</p>',
    immediatelyRender: false, // SSR hydration 불일치 방지
  });

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Tiptap 기본 에디터</h2>

      {/* 아이콘 툴바 */}
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

          {/* 목록 버튼들 */}
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

          {/* 실행 취소/다시 실행 */}
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
```

#### 🎯 학습 목표:

- **아이콘 툴바** 구현 방법
- **Lucide React** 아이콘 라이브러리 사용법
- **툴바 그룹핑** 및 **구분선** 활용
- **툴팁** 및 **접근성** 개선
- **H1~H6 제목** 기능 구현

#### ✨ 아이콘 툴바의 장점:

- **직관적인 UI**: 아이콘으로 기능을 쉽게 인식
- **공간 효율성**: 텍스트보다 작은 공간 사용
- **일관성**: 모든 에디터에서 동일한 아이콘 사용
- **국제화**: 언어에 관계없이 이해 가능
- **접근성**: 툴팁으로 기능 설명 제공
- **완전한 제목 지원**: H1~H6 모든 제목 레벨 지원

#### 🎨 툴바 디자인 특징:

- **그룹핑**: 관련 기능들을 구분선으로 분리
- **상태 표시**: 활성화된 기능을 색상으로 구분
- **호버 효과**: 마우스 오버 시 시각적 피드백
- **비활성화**: 사용할 수 없는 기능은 회색으로 표시

### 2.2 기본 Tiptap 에디터 생성 (텍스트 버전)

**파일 경로**: `src/components/TiptapEditor.tsx`

#### 📝 코드 설명:

```tsx
'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import { useEditor, EditorContent } from '@tiptap/react'; // Tiptap React 훅과 컴포넌트
import StarterKit from '@tiptap/starter-kit'; // 기본 확장 패키지
import { useState } from 'react'; // React 상태 관리

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
        <div className='flex flex-wrap gap-2'>
          {/* 굵은 글씨 버튼 */}
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded text-sm ${
              editor?.isActive('bold')
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Bold
          </button>

          {/* 기울임 버튼 */}
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded text-sm ${
              editor?.isActive('italic')
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Italic
          </button>

          {/* 취소선 버튼 */}
          <button
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`px-3 py-1 rounded text-sm ${
              editor?.isActive('strike')
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Strike
          </button>

          {/* 제목 버튼 */}
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`px-3 py-1 rounded text-sm ${
              editor?.isActive('heading', { level: 1 })
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            H1
          </button>

          {/* 코드 블록 버튼 */}
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={`px-3 py-1 rounded text-sm ${
              editor?.isActive('codeBlock')
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Code Block
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
```

#### 🔍 각 부분 상세 설명:

1. **`useEditor()`**: Tiptap 에디터 인스턴스를 생성하는 훅
2. **`extensions: [StarterKit]`**: 기본 확장 패키지로 기본 기능 제공
3. **`content`**: 초기 에디터 내용 (HTML 형식)
4. **`editorProps`**: 에디터 속성 설정 (스타일링 등)
5. **`EditorContent`**: 실제 에디터 내용을 렌더링하는 컴포넌트
6. **`editor?.chain().focus().toggleBold().run()`**: 체이닝 방식으로 명령 실행

#### 🎯 학습 목표:

- Tiptap 에디터의 기본 구조 이해
- useEditor 훅 활용법
- 체이닝 방식의 명령 실행
- 커스텀 툴바 구현

### 2.2 페이지에 추가

**파일 경로**: `src/app/page.tsx`

페이지에 Tiptap 에디터 추가:

```tsx
// Tiptap 에디터 컴포넌트 임포트
import TiptapEditor from '@/components/TiptapEditor';

// 기존 섹션들에 추가
{
  /* Tiptap 에디터 섹션 */
}
<section>
  <h2 className='text-2xl font-bold mb-4'>7. Tiptap 기본 에디터</h2>
  <TiptapEditor />
</section>;
```

## 🎨 3. Tiptap 고급 기능 구현

### 3.1 확장 기능이 포함된 에디터

**파일 경로**: `src/components/AdvancedTiptapEditor.tsx`

```tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

/**
 * 고급 Tiptap 에디터 컴포넌트
 * - 이미지 삽입 기능
 * - 링크 추가 기능
 * - 확장된 툴바
 */
export default function AdvancedTiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
    ],
    content: '<p>고급 기능이 포함된 에디터입니다.</p>',
  });

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>고급 Tiptap 에디터</h2>

      {/* 확장된 툴바 */}
      <div className='border border-gray-300 rounded-t-lg p-2 bg-gray-50'>
        <div className='flex flex-wrap gap-2'>
          {/* 기본 서식 버튼들 */}
          <button onClick={() => editor?.chain().focus().toggleBold().run()}>
            Bold
          </button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
            Italic
          </button>

          {/* 링크 추가 버튼 */}
          <button
            onClick={() => {
              const url = window.prompt('URL을 입력하세요:');
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run();
              }
            }}
          >
            Link
          </button>

          {/* 이미지 추가 버튼 */}
          <button
            onClick={() => {
              const url = window.prompt('이미지 URL을 입력하세요:');
              if (url) {
                editor?.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            Image
          </button>
        </div>
      </div>

      <div className='border border-gray-300 border-t-0 rounded-b-lg min-h-[400px] p-4'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
```

### 3.2 다크 모드 Tiptap 에디터

**파일 경로**: `src/components/DarkTiptapEditor.tsx`

```tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

/**
 * 다크 모드 Tiptap 에디터 컴포넌트
 * - 라이트/다크 테마 전환
 * - 테마별 스타일링
 * - 조건부 렌더링
 */
export default function DarkTiptapEditor() {
  const [isDark, setIsDark] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>다크 모드 에디터입니다.</p>',
    editorProps: {
      attributes: {
        class: `prose ${isDark ? 'prose-invert' : ''} mx-auto focus:outline-none`,
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
        onClick={() => setIsDark(!isDark)}
        className='mb-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        {isDark ? '라이트 모드' : '다크 모드'}
      </button>

      <div
        className={`border rounded-lg ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
      >
        <div className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <button onClick={() => editor?.chain().focus().toggleBold().run()}>
            Bold
          </button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
            Italic
          </button>
        </div>

        <div
          className={`p-4 min-h-[300px] ${isDark ? 'bg-gray-900' : 'bg-white'}`}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
```

## 📝 4. Tiptap vs React MD Editor 비교

### 4.1 특징 비교

| 기능             | Tiptap      | React MD Editor |
| ---------------- | ----------- | --------------- |
| **타입**         | WYSIWYG     | 마크다운        |
| **학습 곡선**    | 중간        | 쉬움            |
| **확장성**       | 매우 높음   | 중간            |
| **커스터마이징** | 매우 높음   | 중간            |
| **성능**         | 높음        | 높음            |
| **사용 사례**    | 리치 텍스트 | 기술 문서       |

### 4.2 언제 사용할까?

#### Tiptap 사용 시기:

- 복잡한 문서 편집이 필요한 경우
- 표, 이미지, 링크 등 다양한 요소가 필요한 경우
- 사용자 친화적인 WYSIWYG 인터페이스가 필요한 경우

#### React MD Editor 사용 시기:

- 마크다운 문법을 알고 있는 사용자 대상
- 기술 문서나 블로그 작성
- 간단하고 빠른 구현이 필요한 경우

## 🎯 5. Tiptap 실습 과제

### 과제 1: 기본 Tiptap 에디터 구현

- Tiptap 에디터 컴포넌트 생성
- 기본 툴바 기능 구현
- HTML 출력 기능 테스트

### 과제 2: 확장 기능 추가

- 이미지 삽입 기능
- 링크 추가 기능
- 테이블 기능

### 과제 3: 커스텀 확장 개발

- 커스텀 버튼 추가
- 특별한 서식 기능 구현
- 다크 모드 지원

## 📚 6. Tiptap 추가 학습 자료

### 유용한 링크

- [Tiptap 공식 문서](https://tiptap.dev/)
- [Tiptap React 가이드](https://tiptap.dev/guide/react)
- [Tiptap 확장 기능](https://tiptap.dev/guide/custom-extensions)

### 관련 라이브러리

- `@tiptap/core`: 핵심 기능
- `@tiptap/react`: React 통합
- `@tiptap/starter-kit`: 기본 확장 패키지
- `@tiptap/extension-*`: 다양한 확장 기능

## 🐛 7. Tiptap 문제 해결

### 자주 발생하는 문제들

#### 에디터가 렌더링되지 않는 문제

```tsx
// 해결책: useEditor 훅의 의존성 배열 확인
const editor = useEditor(
  {
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  },
  []
); // 빈 의존성 배열 추가
```

#### 확장 기능이 작동하지 않는 문제

```tsx
// 해결책: 확장 기능을 올바르게 임포트하고 설정
import Image from '@tiptap/extension-image';

const editor = useEditor({
  extensions: [
    StarterKit,
    Image.configure({
      // 설정 옵션
    }),
  ],
});
```

#### 스타일이 적용되지 않는 문제

```tsx
// 해결책: Tailwind CSS prose 클래스 사용
editorProps: {
  attributes: {
    class: 'prose prose-sm mx-auto focus:outline-none',
  },
}
```

#### 확장 패키지를 찾을 수 없는 오류

```bash
# 오류: Module not found: Can't resolve '@tiptap/extension-image'
# 해결책: 필요한 확장 패키지 설치
npm install @tiptap/extension-image @tiptap/extension-link
```

#### 확장 기능 임포트 오류

```tsx
// ❌ 잘못된 임포트 (패키지가 설치되지 않은 경우)
import Image from '@tiptap/extension-image';

// ✅ 올바른 임포트 (패키지 설치 후)
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
```

#### SSR Hydration 불일치 오류

```tsx
// 오류: Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false`
// 해결책: immediatelyRender: false 옵션 추가

const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Hello World!</p>',
  immediatelyRender: false, // SSR hydration 불일치 방지
});
```

#### Next.js App Router에서 Tiptap 사용 시 주의사항

```tsx
// ✅ 권장: 'use client' 지시어 사용
'use client';

import { useEditor, EditorContent } from '@tiptap/react';

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false, // SSR 문제 해결
  });

  return <EditorContent editor={editor} />;
}
```

---

## 🔧 6. Tiptap 고급 트러블슈팅

### 6.1 "Duplicate extension names" 에러

**에러 메시지:**

```
[tiptap warn]: Duplicate extension names found: ['link', 'underline']. This can lead to issues.
```

**해결 방법:**
StarterKit에서 중복되는 확장들을 비활성화:

```tsx
StarterKit.configure({
  link: false, // Link 확장을 별도로 설정
  underline: false, // Underline 확장을 별도로 설정
}),
```

### 6.2 "TextStyle import" 에러

**에러 메시지:**

```
Attempted import error: '@tiptap/extension-text-style' does not contain a default export
```

**해결 방법:**
TextStyle을 named import로 변경:

```tsx
// ❌ 잘못된 방법
import TextStyle from '@tiptap/extension-text-style';

// ✅ 올바른 방법
import { TextStyle } from '@tiptap/extension-text-style';
```

### 6.3 "textStyle mark type" 에러

**에러 메시지:**

```
There is no mark type named 'textStyle'. Maybe you forgot to add the extension?
```

**해결 방법:**
TextStyle 확장을 Color 확장보다 먼저 추가:

```tsx
extensions: [
  TextStyle, // Color 확장보다 먼저
  Color,
  // ... 다른 확장들
],
```

### 6.4 이미지 업로드 기능

#### 📁 파일 업로드 + URL 입력 지원

```tsx
// 파일을 Base64로 변환하는 함수
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// 파일 선택 시 실행되는 함수
const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && file.type.startsWith('image/')) {
    try {
      const base64 = await fileToBase64(file);
      editor?.chain().focus().setImage({ src: base64 }).run();
      setShowImageUpload(false);
    } catch (error) {
      console.error('파일 변환 오류:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  } else {
    alert('이미지 파일만 업로드 가능합니다.');
  }
};

// URL로 이미지 추가하는 함수
const handleImageUrl = () => {
  const url = window.prompt('이미지 URL을 입력하세요:');
  if (url) {
    editor?.chain().focus().setImage({ src: url }).run();
  }
};
```

#### 🎯 이미지 업로드 기능의 특징:

- **파일 업로드**: 로컬 이미지 파일을 Base64로 변환하여 삽입
- **URL 입력**: 외부 이미지 URL을 통한 이미지 삽입
- **파일 형식 검증**: 이미지 파일만 업로드 허용
- **에러 처리**: 파일 변환 실패 시 사용자에게 알림
- **사용자 친화적 UI**: 모달 형태의 직관적인 인터페이스

### 6.5 완전한 에디터 설정 예제

```tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      link: false,
      underline: false,
    }),
    TextStyle,
    Color,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight.configure({
      multicolor: true,
    }),
    Underline,
    Superscript,
    Subscript,
    Image,
    Link,
  ],
  immediatelyRender: false,
});
```

---

## 🎓 학습 가이드

### 📖 단계별 학습 순서

#### 1단계: 마크다운 에디터 기초

1. **기본 에디터** 구현 및 이해
2. **고급 기능** (미리보기, 커스텀 툴바) 학습
3. **실무 적용** (블로그 에디터) 구현
4. **문제 해결** 방법 습득

#### 2단계: Tiptap 에디터 기초

1. **기본 Tiptap** 에디터 구현
2. **확장 기능** (이미지, 링크) 추가
3. **아이콘 툴바** 구현
4. **다크 모드** 지원

#### 3단계: 완전한 에디터 구현

1. **모든 확장 기능** 통합
2. **파일 업로드** 기능 구현
3. **색상 시스템** 완성
4. **사용자 경험** 최적화

### 🔧 개발 환경 설정

#### 필수 요구사항

- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상
- **TypeScript**: 5.0.0 이상

#### 권장 개발 도구

- **VS Code**: 코드 에디터
- **ES7+ React/Redux/React-Native snippets**: React 코드 스니펫
- **Tailwind CSS IntelliSense**: Tailwind 자동완성
- **TypeScript Importer**: 자동 import

### 📚 추가 학습 자료

#### 공식 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev/)
- [Tiptap 공식 문서](https://tiptap.dev/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)

#### 유용한 리소스

- [Lucide Icons](https://lucide.dev/): 아이콘 라이브러리
- [Shadcn UI](https://ui.shadcn.com/): 컴포넌트 라이브러리
- [React Query](https://tanstack.com/query/latest): 서버 상태 관리
- [Zustand](https://zustand-demo.pmnd.rs/): 상태 관리

### 🚀 실무 적용 팁

#### 성능 최적화

- **동적 임포트**: `dynamic`을 사용한 코드 분할
- **메모이제이션**: `useMemo`, `useCallback` 활용
- **이미지 최적화**: Next.js Image 컴포넌트 사용

#### 접근성 (A11y)

- **키보드 네비게이션**: Tab, Enter, Escape 키 지원
- **스크린 리더**: ARIA 속성 추가
- **색상 대비**: WCAG 가이드라인 준수

#### 사용자 경험 (UX)

- **로딩 상태**: 파일 업로드 시 로딩 인디케이터
- **에러 처리**: 사용자 친화적인 에러 메시지
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 📞 문의사항

수업 중 궁금한 점이 있으면 언제든 질문해주세요!

### 💬 질문 방법

1. **코드 관련**: 구체적인 에러 메시지와 함께 질문
2. **기능 관련**: 원하는 기능과 현재 구현 상태 설명
3. **최적화 관련**: 성능 문제나 개선 방향 제시

### 🎯 학습 목표 달성 체크리스트

#### 마크다운 에디터

- [ ] 기본 에디터 구현 완료
- [ ] 고급 기능 (미리보기, 커스텀 툴바) 구현
- [ ] 다크 모드 지원
- [ ] 이미지 삽입 기능
- [ ] 에러 처리 및 해결

#### Tiptap 에디터

- [ ] 기본 Tiptap 에디터 구현
- [ ] 확장 기능 (이미지, 링크, 색상) 추가
- [ ] 아이콘 툴바 구현
- [ ] 파일 업로드 기능
- [ ] 완전한 에디터 구현

#### 실무 적용

- [ ] 블로그 에디터 구현
- [ ] 사용자 경험 최적화
- [ ] 성능 최적화
- [ ] 접근성 개선
- [ ] 반응형 디자인
