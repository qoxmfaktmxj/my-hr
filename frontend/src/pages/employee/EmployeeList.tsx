import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Modal,
  DatePicker,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  StopOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import type { Employee } from '../../api/employeeApi';
import { useEmployeeList, useCreateEmployee, useUpdateEmployee, useRetireEmployee } from '../../hooks/useEmployee';
import { useCodeMap } from '../../hooks/useCommonCode';
import EmployeeFormModal from './EmployeeFormModal';

const { Title } = Typography;

interface TableEmployee extends Employee {
  key: string;
}

function EmployeeList() {
  const navigate = useNavigate();
  const { getCodeName, getCodeOptions, getCodeColor } = useCodeMap();

  // 검색 & 페이지네이션 상태
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedStatus, setAppliedStatus] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 모달 상태
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [retireOpen, setRetireOpen] = useState(false);
  const [retireTarget, setRetireTarget] = useState<Employee | null>(null);
  const [retireDate, setRetireDate] = useState<dayjs.Dayjs | null>(dayjs());

  // React Query
  const { data, isLoading } = useEmployeeList({
    page: page - 1,
    size: pageSize,
    keyword: appliedSearch || undefined,
    empStatus: appliedStatus || undefined,
  });

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const retireMutation = useRetireEmployee();

  // 테이블 데이터
  const tableData: TableEmployee[] = (data?.content || []).map((emp) => ({
    ...emp,
    key: emp.sabun,
  }));

  const columns: ColumnsType<TableEmployee> = [
    { title: '사번', dataIndex: 'sabun', key: 'sabun', width: 120 },
    { title: '이름', dataIndex: 'korNm', key: 'korNm', width: 100 },
    { title: '영문명', dataIndex: 'engNm', key: 'engNm', width: 120 },
    {
      title: '부서',
      dataIndex: 'deptNm',
      key: 'deptNm',
      width: 100,
      render: (text: string, record) => text || record.deptCd || '-',
    },
    {
      title: '직급',
      dataIndex: 'rankNm',
      key: 'rankNm',
      width: 80,
      render: (text: string, record) => text || record.rankCd || '-',
    },
    { title: '입사일', dataIndex: 'empYmd', key: 'empYmd', width: 120 },
    {
      title: '상태',
      dataIndex: 'statusCd',
      key: 'statusCd',
      width: 80,
      render: (status: string, record) => {
        const text = record.statusNm || getCodeName('STATUS', status);
        const color = getCodeColor('STATUS', status) || 'default';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    { title: '연락처', dataIndex: 'hpNo', key: 'hpNo', width: 140 },
    { title: '이메일', dataIndex: 'email', key: 'email', width: 180 },
    {
      title: '관리',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/employee/${record.sabun}`)}
          >
            상세
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => { setEditEmployee(record); setEditOpen(true); }}
            disabled={record.statusCd === '30'}
          >
            수정
          </Button>
          {record.statusCd !== '30' && (
            <Button
              type="link"
              size="small"
              danger
              icon={<StopOutlined />}
              onClick={() => { setRetireTarget(record); setRetireDate(dayjs()); setRetireOpen(true); }}
            >
              퇴직
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 검색
  const handleSearch = () => {
    setAppliedSearch(searchText);
    setAppliedStatus(statusFilter);
    setPage(1);
  };

  // 새로고침
  const handleRefresh = () => {
    setSearchText('');
    setStatusFilter(undefined);
    setAppliedSearch('');
    setAppliedStatus(undefined);
    setPage(1);
  };

  // 테이블 변경
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  // 사원 등록
  const handleCreate = (values: Partial<Employee>) => {
    createMutation.mutate(values as Employee, {
      onSuccess: () => setCreateOpen(false),
    });
  };

  // 사원 수정
  const handleUpdate = (values: Partial<Employee>) => {
    if (!editEmployee) return;
    updateMutation.mutate(
      { sabun: editEmployee.sabun, data: values },
      { onSuccess: () => { setEditOpen(false); setEditEmployee(null); } },
    );
  };

  // 퇴직 처리
  const handleRetire = () => {
    if (!retireTarget) return;
    retireMutation.mutate(
      { sabun: retireTarget.sabun, retYmd: retireDate?.format('YYYYMMDD') },
      { onSuccess: () => { setRetireOpen(false); setRetireTarget(null); } },
    );
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateOpen(true)}>
              사원등록
            </Button>
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
              options={getCodeOptions('STATUS')}
            />
          </Col>
          <Col>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              검색
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: data?.totalElements || 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `총 ${total}명`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1400 }}
          size="middle"
        />
      </Card>

      {/* 사원 등록 모달 */}
      <EmployeeFormModal
        open={createOpen}
        loading={createMutation.isPending}
        onOk={handleCreate}
        onCancel={() => setCreateOpen(false)}
      />

      {/* 사원 수정 모달 */}
      <EmployeeFormModal
        open={editOpen}
        employee={editEmployee}
        loading={updateMutation.isPending}
        onOk={handleUpdate}
        onCancel={() => { setEditOpen(false); setEditEmployee(null); }}
      />

      {/* 퇴직 처리 모달 */}
      <Modal
        title="퇴직 처리"
        open={retireOpen}
        onOk={handleRetire}
        onCancel={() => { setRetireOpen(false); setRetireTarget(null); }}
        okText="퇴직 처리"
        okButtonProps={{ danger: true }}
        cancelText="취소"
        confirmLoading={retireMutation.isPending}
      >
        {retireTarget && (
          <>
            <p>
              <strong>{retireTarget.korNm}</strong> ({retireTarget.sabun}) 사원을 퇴직 처리하시겠습니까?
            </p>
            <p>퇴직일자를 선택하세요:</p>
            <DatePicker
              value={retireDate}
              onChange={setRetireDate}
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
            />
          </>
        )}
      </Modal>
    </div>
  );
}

export default EmployeeList;
