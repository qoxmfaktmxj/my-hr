import { useState, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Tag,
  Spin,
} from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  IdcardOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuthStore } from '../stores/useAuthStore';
import { logout as logoutApi } from '../api/authApi';
import { useMenuTree } from '../hooks/useMenu';
import type { MenuTreeNode } from '../api/menuApi';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

/** iconClass 문자열 → Ant Design 아이콘 컴포넌트 매핑 */
const ICON_MAP: Record<string, React.ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  DollarOutlined: <DollarOutlined />,
  CalendarOutlined: <CalendarOutlined />,
  SettingOutlined: <SettingOutlined />,
  IdcardOutlined: <IdcardOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
};

function getIcon(iconClass?: string): React.ReactNode {
  if (!iconClass) return undefined;
  return ICON_MAP[iconClass] || <AppstoreOutlined />;
}

/** 메뉴 트리 데이터 → Ant Design Menu items 변환 */
function toMenuItems(tree: MenuTreeNode[]): MenuProps['items'] {
  return tree.map((node) => {
    if (node.children && node.children.length > 0) {
      return {
        key: node.key,
        icon: getIcon(node.icon),
        label: node.label,
        children: node.children.map((child) => ({
          key: child.key,
          label: child.label,
        })),
      };
    }
    return {
      key: node.key,
      icon: getIcon(node.icon),
      label: node.label,
    };
  });
}

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, clearAuth } = useAuthStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // DB에서 메뉴 조회
  const { data: menuTree, isLoading: menuLoading } = useMenuTree();

  // 메뉴 트리 → Ant Design items 변환
  const menuItems = useMemo(() => {
    if (!menuTree) return [];
    return toMenuItems(menuTree);
  }, [menuTree]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // 에러가 나도 로그아웃 처리
    } finally {
      clearAuth();
      navigate('/login', { replace: true });
    }
  };

  // 사용자 드롭다운 메뉴
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'userInfo',
      label: (
        <div style={{ padding: '4px 0' }}>
          <div><Text strong>{user?.name || '-'}</Text></div>
          <div><Text type="secondary" style={{ fontSize: 12 }}>{user?.sabun || '-'}</Text></div>
          <div>
            <Tag color="blue" style={{ fontSize: 11, marginTop: 4 }}>
              {user?.jikweeNm || '-'} / {user?.jikgubNm || '-'}
            </Tag>
          </div>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'profile',
      icon: <IdcardOutlined />,
      label: '내 정보',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: collapsed ? 16 : 20,
          fontWeight: 'bold',
        }}>
          {collapsed ? 'HR' : 'my-hr'}
        </div>
        {menuLoading ? (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <Spin size="small" />
          </div>
        ) : (
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        )}
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header style={{
          padding: '0 24px',
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}>
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: 'pointer', fontSize: 18 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <Space size={24}>
            <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                <span>{user?.name || '사용자'}</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
