'use client'; // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시

import { useEditor, EditorContent } from '@tiptap/react'; // Tiptap React 훅과 컴포넌트
import StarterKit from '@tiptap/starter-kit'; // 기본 확장 패키지
import Image from '@tiptap/extension-image'; // 이미지 확장 기능
import Link from '@tiptap/extension-link'; // 링크 확장 기능
import Color from '@tiptap/extension-color'; // 글자색상 확장 기능
import { TextStyle } from '@tiptap/extension-text-style'; // 텍스트 스타일 확장 기능
import TextAlign from '@tiptap/extension-text-align'; // 텍스트 정렬 확장 기능
import Highlight from '@tiptap/extension-highlight'; // 하이라이트 확장 기능
import Underline from '@tiptap/extension-underline'; // 밑줄 확장 기능
import Superscript from '@tiptap/extension-superscript'; // 위첨자 확장 기능
import Subscript from '@tiptap/extension-subscript'; // 아래첨자 확장 기능
import { useState, useRef } from 'react'; // React 상태 관리
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
  Code,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Highlighter,
  Type,
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
} from 'lucide-react'; // 아이콘 라이브러리

/**
 * 모든 기능이 포함된 Tiptap 에디터 컴포넌트
 *
 * 🎯 주요 기능:
 * - 텍스트 서식: 굵은 글씨, 기울임, 취소선, 밑줄
 * - 제목 시스템: H1~H6 모든 제목 레벨 지원
 * - 텍스트 정렬: 좌, 중앙, 우, 양쪽 정렬
 * - 색상 시스템: 글자색상, 하이라이트 (20가지 팔레트 + 커스텀)
 * - 고급 서식: 위첨자, 아래첨자
 * - 목록 및 구조: 순서 있는/없는 목록, 인용, 코드 블록
 * - 미디어: 이미지 업로드 (파일 + URL), 링크 삽입/제거
 * - 편집 기능: 실행 취소/다시 실행, 미리보기, 저장
 *
 * 🛠️ 기술 스택:
 * - Tiptap: 확장 가능한 에디터 프레임워크
 * - React Hooks: useState, useRef로 상태 관리
 * - Lucide React: 아이콘 라이브러리
 * - Tailwind CSS: 스타일링
 * - FileReader API: 파일 업로드 처리
 *
 * 📱 반응형 디자인:
 * - 모바일: 터치하기 쉬운 큰 버튼
 * - 데스크톱: 마우스로 정확한 클릭
 * - 태블릿: 중간 크기에서도 편리한 사용
 */
export default function FullFeaturedTiptapEditor() {
  // ===== 상태 관리 =====

  /**
   * 미리보기 모드 상태
   * - true: HTML 미리보기 표시
   * - false: 에디터 편집 모드
   */
  const [showPreview, setShowPreview] = useState(false);

  /**
   * 글자색상 선택기 표시 상태
   * - true: 색상 팔레트 팝업 표시
   * - false: 팝업 숨김
   */
  const [showColorPicker, setShowColorPicker] = useState(false);

  /**
   * 하이라이트 색상 선택기 표시 상태
   * - true: 하이라이트 색상 팔레트 팝업 표시
   * - false: 팝업 숨김
   */
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  /**
   * 이미지 업로드 모달 표시 상태
   * - true: 파일 업로드/URL 입력 모달 표시
   * - false: 모달 숨김
   */
  const [showImageUpload, setShowImageUpload] = useState(false);

  /**
   * 파일 입력 요소 참조
   * - 숨겨진 파일 입력 요소에 접근하기 위한 ref
   * - 프로그래밍 방식으로 파일 선택 다이얼로그 열기
   */
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ===== 에디터 설정 =====

  /**
   * Tiptap 에디터 인스턴스 생성
   * 모든 확장 기능이 포함된 완전한 에디터 설정
   */
  const editor = useEditor({
    extensions: [
      /**
       * StarterKit: 기본 확장 패키지
       * - Bold, Italic, Strike, Code, Paragraph, Heading, BulletList, OrderedList, Blockquote, HardBreak, History
       * - 중복 방지를 위해 link, underline 비활성화
       */
      StarterKit.configure({
        link: false, // Link 확장을 별도로 설정
        underline: false, // Underline 확장을 별도로 설정
      }),

      /**
       * TextStyle: 텍스트 스타일 확장
       * - Color 확장의 전제 조건
       * - 텍스트에 색상 속성을 추가할 수 있게 해줌
       */
      TextStyle,

      /**
       * Color: 글자색상 확장
       * - TextStyle 확장이 있어야 작동
       * - 텍스트 색상을 변경할 수 있게 해줌
       */
      Color,

      /**
       * Image: 이미지 삽입 확장
       * - 이미지 URL 또는 Base64 데이터를 삽입
       * - 반응형 이미지 스타일링 적용
       */
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg', // 반응형 이미지 스타일
        },
      }),

      /**
       * Link: 링크 삽입 확장
       * - 텍스트에 링크를 추가/제거
       * - 클릭 시 새 창에서 열지 않도록 설정
       */
      Link.configure({
        openOnClick: false, // 링크 클릭 시 새 창에서 열지 않음
        HTMLAttributes: {
          class: 'text-blue-500 underline hover:text-blue-700', // 링크 스타일링
        },
      }),

      /**
       * TextAlign: 텍스트 정렬 확장
       * - 제목과 문단에 정렬 적용
       * - 좌, 중앙, 우, 양쪽 정렬 지원
       */
      TextAlign.configure({
        types: ['heading', 'paragraph'], // 제목과 문단에 정렬 적용
      }),

      /**
       * Highlight: 하이라이트 확장
       * - 텍스트 배경색 변경
       * - 여러 색상 하이라이트 지원
       */
      Highlight.configure({
        multicolor: true, // 여러 색상 하이라이트 지원
      }),

      /**
       * Underline: 밑줄 확장
       * - 텍스트에 밑줄 추가/제거
       */
      Underline,

      /**
       * Superscript: 위첨자 확장
       * - 수학 공식, 각주 등에 사용
       * - 예: x², 1st
       */
      Superscript,

      /**
       * Subscript: 아래첨자 확장
       * - 화학식, 수식 등에 사용
       * - 예: H₂O, CO₂
       */
      Subscript,
    ],
    content:
      '<p>모든 기능이 포함된 에디터입니다. 다양한 서식을 적용해보세요!</p>', // 초기 내용
    immediatelyRender: false, // SSR hydration 불일치 방지
    editorProps: {
      attributes: {
        class: 'prose prose-lg mx-auto focus:outline-none min-h-[500px]', // 에디터 스타일링
      },
    },
  });

  // ===== 핵심 기능 함수들 =====

  /**
   * 저장 버튼 클릭 시 실행되는 함수
   *
   * @description
   * - 에디터의 현재 내용을 HTML 형태로 가져옴
   * - 콘솔에 HTML 출력 (개발 시 디버깅용)
   * - 사용자에게 저장 완료 알림
   *
   * @todo 실제 저장 로직 구현 필요
   * - 서버 API 연동
   * - 파일 시스템 저장
   * - 데이터베이스 저장
   */
  const handleSave = () => {
    const htmlContent = editor?.getHTML(); // 에디터의 HTML 내용 가져오기
    console.log('내용 (HTML):', htmlContent);
    alert('저장되었습니다! (콘솔을 확인하세요)');
  };

  /**
   * HTML 내용을 가져오는 함수
   *
   * @returns {string} 에디터의 HTML 내용
   * @description 미리보기 모드에서 사용되는 함수
   */
  const getHTMLContent = () => {
    return editor?.getHTML() || '';
  };

  // ===== 색상 관련 함수들 =====

  /**
   * 글자색상 선택 시 실행되는 함수
   *
   * @param {string} color - 선택된 색상 코드 (HEX 형식)
   * @description
   * - 선택된 색상을 현재 커서 위치의 텍스트에 적용
   * - 색상 선택기 팝업을 자동으로 닫음
   * - Tiptap의 setColor 명령어 사용
   */
  const handleColorChange = (color: string) => {
    editor?.chain().focus().setColor(color).run();
    setShowColorPicker(false);
  };

  /**
   * 하이라이트 색상 선택 시 실행되는 함수
   *
   * @param {string} color - 선택된 색상 코드 (HEX 형식)
   * @description
   * - 선택된 색상으로 텍스트 배경을 하이라이트
   * - 하이라이트 색상 선택기 팝업을 자동으로 닫음
   * - Tiptap의 setHighlight 명령어 사용
   */
  const handleHighlightChange = (color: string) => {
    editor?.chain().focus().setHighlight({ color }).run();
    setShowHighlightPicker(false);
  };

  // ===== 파일 업로드 관련 함수들 =====

  /**
   * 파일을 Base64로 변환하는 함수
   *
   * @param {File} file - 변환할 파일 객체
   * @returns {Promise<string>} Base64 인코딩된 문자열
   * @description
   * - FileReader API를 사용하여 파일을 Base64로 변환
   * - 이미지 파일을 에디터에 삽입하기 위해 사용
   * - Promise를 반환하여 비동기 처리
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  /**
   * 파일 선택 시 실행되는 함수
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 파일 입력 이벤트
   * @description
   * - 사용자가 선택한 파일을 검증
   * - 이미지 파일인지 확인 (MIME 타입 체크)
   * - 파일을 Base64로 변환하여 에디터에 삽입
   * - 에러 처리 및 사용자 알림
   */
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  /**
   * 파일 선택 버튼 클릭 시 실행되는 함수
   *
   * @description
   * - 숨겨진 파일 입력 요소를 프로그래밍 방식으로 클릭
   * - 사용자가 파일 선택 다이얼로그를 열 수 있게 함
   * - useRef로 참조한 파일 입력 요소에 접근
   */
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * URL로 이미지 추가하는 함수
   *
   * @description
   * - 사용자에게 이미지 URL을 입력받음
   * - 입력된 URL을 에디터에 이미지로 삽입
   * - 외부 이미지 URL 지원 (CDN, 클라우드 스토리지 등)
   */
  const handleImageUrl = () => {
    const url = window.prompt('이미지 URL을 입력하세요:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  // ===== 색상 팔레트 =====

  /**
   * 미리 정의된 색상 팔레트
   *
   * @description
   * - 20가지 기본 색상 제공
   * - 글자색상 및 하이라이트 색상 선택에 사용
   * - HEX 형식의 색상 코드 배열
   * - 사용자가 빠르게 색상을 선택할 수 있게 함
   */
  const colorPalette = [
    '#000000', // 검정색
    '#FFFFFF', // 흰색
    '#FF0000', // 빨간색
    '#00FF00', // 초록색
    '#0000FF', // 파란색
    '#FFFF00', // 노란색
    '#FF00FF', // 자홍색
    '#00FFFF', // 청록색
    '#FFA500', // 주황색
    '#800080', // 보라색
    '#FFC0CB', // 분홍색
    '#A52A2A', // 갈색
    '#808080', // 회색
    '#000080', // 네이비
    '#008000', // 다크 그린
    '#FFD700', // 금색
    '#FF6347', // 토마토색
    '#40E0D0', // 터콰이즈
    '#EE82EE', // 바이올렛
    '#90EE90', // 라이트 그린
  ];

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>
        모든 기능이 포함된 Tiptap 에디터
      </h2>

      {/* 확장된 툴바 */}
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

          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('underline')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='밑줄 (Ctrl+U)'
          >
            <UnderlineIcon size={16} />
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

          {/* 텍스트 정렬 버튼들 */}
          <button
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive({ textAlign: 'left' })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='왼쪽 정렬'
          >
            <AlignLeft size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive({ textAlign: 'center' })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='가운데 정렬'
          >
            <AlignCenter size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive({ textAlign: 'right' })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='오른쪽 정렬'
          >
            <AlignRight size={16} />
          </button>

          <button
            onClick={() =>
              editor?.chain().focus().setTextAlign('justify').run()
            }
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive({ textAlign: 'justify' })
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='양쪽 정렬'
          >
            <AlignJustify size={16} />
          </button>

          {/* 구분선 */}
          <div className='w-px h-8 bg-gray-300 mx-1'></div>

          {/* 색상 및 하이라이트 버튼들 */}
          <div className='relative'>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className='p-2 rounded hover:bg-gray-200 transition-colors text-gray-700'
              title='글자색상'
            >
              <Palette size={16} />
            </button>

            {/* 색상 선택기 */}
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
              className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                editor?.isActive('highlight')
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700'
              }`}
              title='하이라이트'
            >
              <Highlighter size={16} />
            </button>

            {/* 하이라이트 색상 선택기 */}
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

          {/* 구분선 */}
          <div className='w-px h-8 bg-gray-300 mx-1'></div>

          {/* 목록 및 기타 버튼들 */}
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

          {/* 위첨자/아래첨자 버튼들 */}
          <button
            onClick={() => editor?.chain().focus().toggleSuperscript().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('superscript')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='위첨자'
          >
            <SuperscriptIcon size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleSubscript().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('subscript')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700'
            }`}
            title='아래첨자'
          >
            <SubscriptIcon size={16} />
          </button>

          {/* 구분선 */}
          <div className='w-px h-8 bg-gray-300 mx-1'></div>

          {/* 링크 및 이미지 버튼들 */}
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

          <button
            onClick={() => editor?.chain().focus().unsetLink().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor?.isActive('link') ? 'text-gray-700' : 'text-gray-400'
            }`}
            title='링크 제거'
          >
            <Unlink size={16} />
          </button>

          <div className='relative'>
            <button
              onClick={() => setShowImageUpload(!showImageUpload)}
              className='p-2 rounded hover:bg-gray-200 transition-colors text-gray-700'
              title='이미지 추가'
            >
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
      <div className='border border-gray-300 border-t-0 rounded-b-lg min-h-[500px] p-4'>
        <EditorContent editor={editor} />
      </div>

      {/* 하단 버튼 영역 */}
      <div className='flex justify-between mt-4'>
        {/* 미리보기 토글 버튼 */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className='px-4 py-2 bg-gray-500 text-white rounded flex items-center gap-2 hover:bg-gray-600 transition-colors'
        >
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          {showPreview ? '편집 모드' : '미리보기'}
        </button>

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
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
            dangerouslySetInnerHTML={{ __html: getHTMLContent() }}
          />
        </div>
      )}
    </div>
  );
}
