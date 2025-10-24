/**
 * 블로그 포스트 데이터 구조
 * - 데이터베이스나 API에서 사용할 블로그 포스트 타입
 */
export interface BlogPost {
  id: string; // 고유 식별자
  title: string; // 블로그 제목
  content: string; // 블로그 내용 (마크다운 형식)
  createdAt: Date; // 생성일시
  updatedAt: Date; // 수정일시
}

/**
 * 에디터 상태 관리 인터페이스
 * - 블로그 에디터 컴포넌트에서 사용하는 상태 타입
 */
export interface EditorState {
  title: string; // 에디터의 제목 상태
  content: string; // 에디터의 내용 상태 (마크다운)
  isPreview: boolean; // 미리보기 모드 여부
}
