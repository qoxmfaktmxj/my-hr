import { useState, useEffect } from 'react';
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
  message,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { getEmployees } from '../../api/employeeApi';
import type { Employee } from '../../api/employeeApi';

const { Title } = Typography;

interface TableEmployee extends Employee {
  key: string;
}

const columns: ColumnsType<TableEmployee> = [
  {
    title: '사번',
    dataIndex: 'sabun',
    key: 'sabun',
    width: 120,
  },
  {
    title: '이름',
    dataIndex: 'korNm',
    key: 'korNm',
    width: 100,
  },
  {
    title: '영문명',
    dataIndex: 'engNm',
    key: 'engNm',
    width: 120,
  },
  {
    title: '부서',
    dataIndex: 'deptNm',
    key: 'deptNm',
    width: 100,
    render: (text: string, record: TableEmployee) => text || record.deptCd || '-',
  },
  {
    title: '직급',
    dataIndex: 'rankNm',
    key: 'rankNm',
    width: 80,
    render: (text: string, record: TableEmployee) => text || record.rankCd || '-',
  },
  {
    title: '입사일',
    dataIndex: 'empYmd',
    key: 'empYmd',
    width: 120,
  },
  {
    title: '상태',
    dataIndex: 'statusCd',
    key: 'statusCd',
    width: 80,
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
  {
    title: '연락처',
    dataIndex: 'hpNo',
    key: 'hpNo',
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
    render: (_, record) => (
      <Space size="small">
        <Button type="link" size="small" onClick={() => console.log('상세', record.sabun)}>
          상세
        </Button>
        <Button type="link" size="small" onClick={() => console.log('수정', record.sabun)}>
          수정
        </Button>
      </Space>
    ),
  },
];

function EmployeeList() {
  const [data, setData] = useState<TableEmployee[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `총 ${total}명`,
  });

  // 데이터 조회
  const fetchData = async (page = 1, pageSize = 10, keyword = '', empStatus = '') => {
    setLoading(true);
    try {
      const response = await getEmployees({
        page: page - 1, // Spring은 0부터 시작
        size: pageSize,
        keyword: keyword || undefined,
        empStatus: empStatus || undefined,
      });

      const tableData: TableEmployee[] = response.content.map((emp) => ({
        ...emp,
        key: emp.sabun,
      }));

      setData(tableData);
      setPagination((prev) => ({
        ...prev,
        current: page,
        pageSize: pageSize,
        total: response.totalElements,
      }));
    } catch (error) {
      console.error('데이터 조회 실패:', error);
      message.error('사원 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchData();
  }, []);

  // 테이블 변경 (페이지네이션, 정렬 등)
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchData(
      newPagination.current || 1,
      newPagination.pageSize || 10,
      searchText,
      statusFilter || ''
    );
  };

  // 검색
  const handleSearch = () => {
    fetchData(1, pagination.pageSize as number, searchText, statusFilter || '');
  };

  // 새로고침
  const handleRefresh = () => {
    setSearchText('');
    setStatusFilter(undefined);
    fetchData(1, pagination.pageSize as number);
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>사원목록</Title>
        </Col>
        <Col>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              새로고침
            </Button>
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
              onPressEnter={handleSearch}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="재직상태 선택"
              style={{ width: '100%' }}
              allowClear
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: '10', label: '재직' },
                { value: '20', label: '휴직' },
                { value: '30', label: '퇴직' },
              ]}
            />
          </Col>
          <Col>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              검색
            </Button>
          </Col>
        </Row>

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={handleTableChange}
            scroll={{ x: 1300 }}
            size="middle"
          />
        </Spin>
      </Card>
    </div>
  );
}

export default EmployeeList;
