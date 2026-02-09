import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table, Tag, Typography, Spin, message } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { getEmployees, getDashboardStats } from '../api/employeeApi';
import type { Employee, DashboardStats } from '../api/employeeApi';

const { Title } = Typography;

interface TableEmployee extends Employee {
  key: string;
}

const columns = [
  { title: '사번', dataIndex: 'sabun', key: 'sabun' },
  { title: '이름', dataIndex: 'korNm', key: 'korNm' },
  { title: '입사일', dataIndex: 'empYmd', key: 'empYmd' },
  { title: '이메일', dataIndex: 'email', key: 'email' },
  {
    title: '상태',
    dataIndex: 'statusCd',
    key: 'statusCd',
    render: (status: string, record: TableEmployee) => {
      let color = 'default';
      const text = record.statusNm || status;
      switch (status) {
        case '10':
          color = 'green';
          break;
        case '20':
          color = 'orange';
          break;
        case '30':
          color = 'red';
          break;
      }
      return <Tag color={color}>{text}</Tag>;
    },
  },
];

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    leaveEmployees: 0,
    retiredEmployees: 0,
    newThisMonth: 0,
    departments: 0,
  });
  const [recentEmployees, setRecentEmployees] = useState<TableEmployee[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 통계 API와 최근 사원 목록을 병렬 호출
        const [statsData, employeeData] = await Promise.all([
          getDashboardStats(),
          getEmployees({ page: 0, size: 5 }),
        ]);

        setStats(statsData);

        const tableData: TableEmployee[] = employeeData.content.map((emp) => ({
          ...emp,
          key: emp.sabun,
        }));
        setRecentEmployees(tableData);
      } catch (error) {
        console.error('대시보드 데이터 조회 실패:', error);
        message.error('대시보드 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Spin spinning={loading}>
      <div>
        <Title level={4}>대시보드</Title>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} lg={4}>
            <Card>
              <Statistic
                title="전체 사원"
                value={stats.totalEmployees}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card>
              <Statistic
                title="재직 중"
                value={stats.activeEmployees}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card>
              <Statistic
                title="휴직 중"
                value={stats.leaveEmployees}
                prefix={<PauseCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card>
              <Statistic
                title="퇴직"
                value={stats.retiredEmployees}
                prefix={<StopOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card>
              <Statistic
                title="이번 달 입사"
                value={stats.newThisMonth}
                prefix={<RiseOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card>
              <Statistic
                title="부서 수"
                value={stats.departments}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>

        <Card title="최근 등록 사원" style={{ marginTop: 24 }}>
          <Table
            columns={columns}
            dataSource={recentEmployees}
            pagination={false}
            size="small"
          />
        </Card>
      </div>
    </Spin>
  );
}

export default Dashboard;
