import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table, Tag, Typography, Spin, message } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  RiseOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { getEmployees } from '../api/employeeApi';
import type { Employee } from '../api/employeeApi';

const { Title } = Typography;

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  newThisMonth: number;
  departments: number;
}

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
    newThisMonth: 0,
    departments: 0,
  });
  const [recentEmployees, setRecentEmployees] = useState<TableEmployee[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 최근 사원 목록 조회 (최대 5명)
        const response = await getEmployees({ page: 0, size: 5 });

        const tableData: TableEmployee[] = response.content.map((emp) => ({
          ...emp,
          key: emp.sabun,
        }));

        setRecentEmployees(tableData);

        // 통계 데이터 설정
        // 실제 운영에서는 별도 통계 API를 만들어야 함
        const activeCount = response.content.filter(emp => emp.statusCd === '10').length;

        setStats({
          totalEmployees: response.totalElements,
          activeEmployees: activeCount,
          newThisMonth: response.content.filter(emp => {
            if (!emp.empYmd) return false;
            // empYmd 형식: "20240201" (YYYYMMDD)
            const year = parseInt(emp.empYmd.substring(0, 4));
            const month = parseInt(emp.empYmd.substring(4, 6)) - 1; // 0-based
            const now = new Date();
            return month === now.getMonth() && year === now.getFullYear();
          }).length,
          departments: [...new Set(response.content.map(emp => emp.deptCd).filter(Boolean))].length,
        });
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
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="전체 사원"
                value={stats.totalEmployees}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="재직 중"
                value={stats.activeEmployees}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="이번 달 입사"
                value={stats.newThisMonth}
                prefix={<RiseOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
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
