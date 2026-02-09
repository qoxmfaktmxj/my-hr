import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

// API 기본 설정
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Cookie(Refresh Token) 자동 전송
});

/** 토큰 갱신 중 여부 (중복 갱신 방지) */
let isRefreshing = false;

/** 토큰 갱신 대기 중인 요청 큐 */
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

/**
 * 대기 중인 요청들을 처리
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

// ========== 요청 인터셉터 ==========
// Access Token을 메모리(Zustand)에서 가져와서 Authorization 헤더에 자동 첨부
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========== 응답 인터셉터 ==========
// 401 에러 시 Refresh Token으로 Access Token 자동 갱신
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 + 재시도하지 않은 요청인 경우 → 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 로그인/갱신 요청 자체가 401이면 → 로그인 페이지로
      if (originalRequest.url?.includes('/auth/login') ||
          originalRequest.url?.includes('/auth/refresh')) {
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // 이미 토큰 갱신 중이면 큐에 추가하여 대기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh Token(Cookie)으로 새 Access Token 발급
        const response = await axios.post(
          'http://localhost:8080/api/auth/refresh',
          null,
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        // Zustand store에 새 토큰 저장 (메모리)
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 대기 중인 요청들 처리
        processQueue(null, newAccessToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh Token도 만료 → 로그인 페이지로 이동
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    // 403: 권한 없음
    if (error.response?.status === 403) {
      console.error('접근 권한이 없습니다.');
    }

    // 423: 계정 잠금
    if (error.response?.status === 423) {
      console.error('계정이 잠겨있습니다.');
    }

    // 500: 서버 오류
    if (error.response?.status === 500) {
      console.error('서버 오류가 발생했습니다.');
    }

    // 네트워크 오류
    if (!error.response) {
      console.error('서버에 연결할 수 없습니다.');
    }

    return Promise.reject(error);
  }
);

export default api;
