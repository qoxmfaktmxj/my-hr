import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  Space,
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
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: '대시보드',
  },
  {
    key: 'employee',
    icon: <UserOutlined />,
    label: '사원관리',
    children: [
      { key: '/employee', label: '사원목록' },
      { key: '/employee/register', label: '사원등록' },
    ],
  },
  {
    key: 'organization',
    icon: <TeamOutlined />,
    label: '조직관리',
    children: [
      { key: '/organization/department', label: '부서관리' },
      { key: '/organization/position', label: '직급관리' },
    ],
  },
  {
    key: 'payroll',
    icon: <DollarOutlined />,
    label: '급여관리',
    children: [
      { key: '/payroll/salary', label: '급여계산' },
      { key: '/payroll/yearend', label: '연말정산' },
    ],
  },
  {
    key: 'attendance',
    icon: <CalendarOutlined />,
    label: '근태관리',
    children: [
      { key: '/attendance/daily', label: '일일근태' },
      { key: '/attendance/vacation', label: '휴가관리' },
    ],
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '설정',
  },
];

const userMenuItems: MenuProps['items'] = [
  { key: 'profile', label: '내 정보' },
  { key: 'logout', label: '로그아웃' },
];

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

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
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
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
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>관리자</span>
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
