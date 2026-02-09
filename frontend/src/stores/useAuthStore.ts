import { create } from 'zustand';

/**
 * 사용자 세션 정보 타입
 * Backend UserSessionDto와 일치
 */
export interface UserSession {
  // TSYS305 (USER관리)
  enterCd: string;
  sabun: string;
  id: string;
  searchType: string;
  extraYn: string;
  mainType: string;
  skinType: string;
  fontType: string;

  // THRM100 (인사마스타)
  name: string;
  nameUs: string;
  empYmd: string;
  sexType: string;

  // THRM151 (인사이력) + TORG101 (조직)
  orgCd: string;
  orgNm: string;
  jikgubCd: string;
  jikgubNm: string;
  jikweeCd: string;
  jikweeNm: string;
  jikchakCd: string;
  jikchakNm: string;
  statusCd: string;
  statusNm: string;
  manageCd: string;
  manageNm: string;
  businessPlaceCd: string;
  businessPlaceNm: string;
}

interface AuthState {
  /** Access Token (메모리에만 저장 - XSS 방어) */
  accessToken: string | null;

  /** 사용자 세션 정보 */
  user: UserSession | null;

  /** 인증 여부 */
  isAuthenticated: boolean;

  /** 로딩 중 여부 (토큰 갱신 등) */
  isLoading: boolean;

  /** 비밀번호 변경 필요 여부 */
  passwordChangeRequired: boolean;

  // ========== Actions ==========

  /** 로그인 성공 시 상태 설정 */
  setAuth: (accessToken: string, user: UserSession, passwordChangeRequired?: boolean) => void;

  /** Access Token만 갱신 */
  setAccessToken: (accessToken: string) => void;

  /** 사용자 정보 갱신 */
  setUser: (user: UserSession) => void;

  /** 로그아웃 (상태 초기화) */
  clearAuth: () => void;

  /** 로딩 상태 설정 */
  setLoading: (loading: boolean) => void;
}

/**
 * 인증 상태 관리 Store (Zustand)
 *
 * Vue Pinia의 defineStore와 유사한 역할
 * - accessToken은 메모리에만 저장 (localStorage 사용 안 함 → XSS 방어)
 * - refreshToken은 HttpOnly Cookie에 저장 (JavaScript 접근 불가)
 * - 페이지 새로고침 시 /api/auth/refresh로 토큰 재발급
 */
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true, // 초기에는 true (토큰 갱신 시도 중)
  passwordChangeRequired: false,

  setAuth: (accessToken, user, passwordChangeRequired = false) =>
    set({
      accessToken,
      user,
      isAuthenticated: true,
      isLoading: false,
      passwordChangeRequired,
    }),

  setAccessToken: (accessToken) =>
    set({ accessToken }),

  setUser: (user) =>
    set({ user }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      passwordChangeRequired: false,
    }),

  setLoading: (loading) =>
    set({ isLoading: loading }),
}));
