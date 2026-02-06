import { Card, Col, Row, Statistic, Table, Tag, Typography } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  RiseOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

// 임시 데이터
const recentEmployees = [
  { key: '1', name: '김철수', department: '개발팀', position: '대리', status: '재직' },
  { key: '2', name: '이영희', department: '인사팀', position: '과장', status: '재직' },
  { key: '3', name: '박민수', department: '영업팀', position: '사원', status: '재직' },
  { key: '4', name: '정수진', department: '기획팀', position: '대리', status: '휴직' },
];

const columns = [
  { title: '이름', dataIndex: 'name', key: 'name' },
  { title: '부서', dataIndex: 'department', key: 'department' },
  { title: '직급', dataIndex: 'position', key: 'position' },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === '재직' ? 'green' : 'orange'}>{status}</Tag>
    ),
  },
];

function Dashboard() {
  return (
    <div>
      <Title level={4}>대시보드</Title>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="전체 사원"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="부서 수"
              value={28}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="이번 달 입사"
              value={12}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="금일 출근"
              value={1156}
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
  );
}

export default Dashboard;
