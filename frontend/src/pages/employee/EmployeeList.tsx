import { useState } from 'react';
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Select,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Employee {
  key: string;
  sabun: string;
  name: string;
  department: string;
  position: string;
  rank: string;
  joinDate: string;
  status: string;
  phone: string;
  email: string;
}

// 임시 데이터
const mockData: Employee[] = [
  {
    key: '1',
    sabun: 'EMP001',
    name: '김철수',
    department: '개발팀',
    position: '팀장',
    rank: '과장',
    joinDate: '2020-03-15',
    status: '재직',
    phone: '010-1234-5678',
    email: 'kim@company.com',
  },
  {
    key: '2',
    sabun: 'EMP002',
    name: '이영희',
    department: '인사팀',
    position: '담당',
    rank: '대리',
    joinDate: '2021-07-01',
    status: '재직',
    phone: '010-2345-6789',
    email: 'lee@company.com',
  },
  {
    key: '3',
    sabun: 'EMP003',
    name: '박민수',
    department: '영업팀',
    position: '사원',
    rank: '사원',
    joinDate: '2023-01-10',
    status: '재직',
    phone: '010-3456-7890',
    email: 'park@company.com',
  },
  {
    key: '4',
    sabun: 'EMP004',
    name: '정수진',
    department: '기획팀',
    position: '담당',
    rank: '대리',
    joinDate: '2019-05-20',
    status: '휴직',
    phone: '010-4567-8901',
    email: 'jung@company.com',
  },
  {
    key: '5',
    sabun: 'EMP005',
    name: '최동훈',
    department: '개발팀',
    position: '사원',
    rank: '사원',
    joinDate: '2024-02-01',
    status: '재직',
    phone: '010-5678-9012',
    email: 'choi@company.com',
  },
];

const columns: ColumnsType<Employee> = [
  {
    title: '사번',
    dataIndex: 'sabun',
    key: 'sabun',
    width: 100,
  },
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: '부서',
    dataIndex: 'department',
    key: 'department',
    width: 120,
  },
  {
    title: '직책',
    dataIndex: 'position',
    key: 'position',
    width: 100,
  },
  {
    title: '직급',
    dataIndex: 'rank',
    key: 'rank',
    width: 80,
  },
  {
    title: '입사일',
    dataIndex: 'joinDate',
    key: 'joinDate',
    width: 120,
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    render: (status: string) => {
      const color = status === '재직' ? 'green' : status === '휴직' ? 'orange' : 'red';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '연락처',
    dataIndex: 'phone',
    key: 'phone',
    width: 140,
  },
  {
    title: '이메일',
    dataIndex: 'email',
    key: 'email',
    width: 180,
  },
  {
    title: '관리',
    key: 'action',
    width: 100,
    render: (_) => (
      <Space size="small">
        <Button type="link" size="small">상세</Button>
        <Button type="link" size="small">수정</Button>
      </Space>
    ),
  },
];

function EmployeeList() {
  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string | undefined>(undefined);

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.name.includes(searchText) || item.sabun.includes(searchText);
    const matchesDepartment = !departmentFilter || item.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>사원목록</Title>
        </Col>
        <Col>
          <Space>
            <Button icon={<DownloadOutlined />}>엑셀 다운로드</Button>
            <Button type="primary" icon={<PlusOutlined />}>사원등록</Button>
          </Space>
        </Col>
      </Row>

      <Card>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="이름 또는 사번 검색"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="부서 선택"
              style={{ width: '100%' }}
              allowClear
              value={departmentFilter}
              onChange={setDepartmentFilter}
              options={[
                { value: '개발팀', label: '개발팀' },
                { value: '인사팀', label: '인사팀' },
                { value: '영업팀', label: '영업팀' },
                { value: '기획팀', label: '기획팀' },
              ]}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `총 ${total}명`,
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </Card>
    </div>
  );
}

export default EmployeeList;
