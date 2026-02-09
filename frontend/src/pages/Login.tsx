import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Alert,
  Space,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { login as loginApi } from '../api/authApi';
import { useAuthStore } from '../stores/useAuthStore';

const { Title, Text } = Typography;

interface LoginFormValues {
  id: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginApi({
        id: values.id,
        password: values.password,
        enterCd: 'BS',
      });

      // Zustand Store에 인증 정보 저장 (메모리)
      setAuth(
        response.accessToken,
        response.userInfo,
        response.passwordChangeRequired,
      );

      // 비밀번호 변경 필요 시 알림 (추후 비밀번호 변경 페이지로 이동 가능)
      if (response.passwordChangeRequired) {
        console.warn('비밀번호 변경이 필요합니다. (90일 초과)');
      }

      // 대시보드로 이동
      navigate('/', { replace: true });

    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { status: number; data?: { message?: string } } };
        if (axiosError.response?.status === 401) {
          setError(axiosError.response.data?.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
        } else if (axiosError.response?.status === 423) {
          setError(axiosError.response.data?.message || '계정이 잠겨있습니다. 관리자에게 문의하세요.');
        } else {
          setError('로그인 중 오류가 발생했습니다.');
        }
      } else {
        setError('서버에 연결할 수 없습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Card
        style={{
          width: 420,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          borderRadius: 12,
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 로고 / 타이틀 */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              my-hr
            </Title>
            <Text type="secondary">인사관리시스템</Text>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
            />
          )}

          {/* 로그인 폼 */}
          <Form
            name="login"
            onFinish={handleLogin}
            autoComplete="off"
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="id"
              rules={[{ required: true, message: '아이디를 입력해주세요' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="아이디"
                autoFocus
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="비밀번호"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{ height: 44, fontSize: 16 }}
              >
                로그인
              </Button>
            </Form.Item>
          </Form>

          {/* 안내 문구 */}
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              비밀번호를 잊으셨나요? 관리자에게 문의하세요.
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default Login;
