import api from './axios';
import type { UserSession } from '../stores/useAuthStore';

// ========== Request Types ==========

export interface LoginRequest {
  id: string;
  password: string;
  enterCd?: string;
}

// ========== Response Types ==========

export interface LoginResponse {
  accessToken: string;
  userInfo: UserSession;
  passwordChangeRequired: boolean;
  message: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  message: string;
}

// ========== API Functions ==========

/**
 * 로그인
 * POST /api/auth/login
 */
export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', request, {
    withCredentials: true,  // Refresh Token Cookie 수신
  });
  return response.data;
};

/**
 * 로그아웃
 * POST /api/auth/logout
 */
export const logout = async (): Promise<void> => {
  await api.post('/auth/logout', null, {
    withCredentials: true,
  });
};

/**
 * Access Token 갱신
 * POST /api/auth/refresh
 * Refresh Token은 Cookie에서 자동 전송
 */
export const refreshToken = async (): Promise<TokenRefreshResponse> => {
  const response = await api.post<TokenRefreshResponse>('/auth/refresh', null, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * 내 정보 조회
 * GET /api/auth/me
 */
export const getMyInfo = async (): Promise<UserSession> => {
  const response = await api.get<UserSession>('/auth/me', {
    withCredentials: true,
  });
  return response.data;
};
