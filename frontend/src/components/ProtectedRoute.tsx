import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuthStore } from '../stores/useAuthStore';
import { refreshToken as refreshTokenApi, getMyInfo } from '../api/authApi';

/**
 * 인증 라우터 가드
 * 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
 *
 * 페이지 새로고침 시:
 * 1. Zustand store가 초기화됨 (메모리이므로)
 * 2. Refresh Token(Cookie)으로 Access Token 재발급 시도
 * 3. 성공 시 → 사용자 정보 재조회 → 정상 렌더링
 * 4. 실패 시 → 로그인 페이지로 이동
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated, isLoading, setAuth, clearAuth, setLoading } = useAuthStore();

  useEffect(() => {
    // 이미 인증되어 있으면 Skip
    if (isAuthenticated) {
      setLoading(false);
      return;
    }

    // 페이지 새로고침 시 토큰 갱신 시도
    const tryRefreshToken = async () => {
      setLoading(true);
      try {
        // Refresh Token(Cookie)으로 Access Token 재발급
        const tokenResponse = await refreshTokenApi();
        // 사용자 정보 재조회
        const userInfo = await getMyInfo();
        // Store 업데이트
        setAuth(tokenResponse.accessToken, userInfo);
      } catch {
        // Refresh Token도 만료 → 로그인 필요
        clearAuth();
      }
    };

    tryRefreshToken();
  }, [isAuthenticated, setAuth, clearAuth, setLoading]);

  // 로딩 중 (토큰 갱신 시도 중)
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size="large" tip="인증 확인 중..." />
      </div>
    );
  }

  // 인증되지 않은 경우 → 로그인 페이지로
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 인증된 경우 → 자식 컴포넌트 렌더링
  return <>{children}</>;
}

export default ProtectedRoute;
