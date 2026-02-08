import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Button,
  Space,
  Tag,
  Spin,
  Typography,
  Row,
  Col,
  Modal,
  DatePicker,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  StopOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useEmployeeDetail, useUpdateEmployee, useDeleteEmployee } from '../../hooks/useEmployee';
import EmployeeFormModal from './EmployeeFormModal';
import type { Employee } from '../../api/employeeApi';

const { Title } = Typography;

function getStatusTag(statusCd?: string, statusNm?: string) {
  const text = statusNm || statusCd || '-';
  switch (statusCd) {
    case '10': return <Tag color="green">{text}</Tag>;
    case '20': return <Tag color="orange">{text}</Tag>;
    case '30': return <Tag color="red">{text}</Tag>;
    default:   return <Tag>{text}</Tag>;
  }
}

function formatDate(ymd?: string) {
  if (!ymd || ymd.length !== 8) return '-';
  return `${ymd.substring(0, 4)}-${ymd.substring(4, 6)}-${ymd.substring(6, 8)}`;
}

function EmployeeDetail() {
  const { sabun } = useParams<{ sabun: string }>();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [retireOpen, setRetireOpen] = useState(false);
  const [retireDate, setRetireDate] = useState<dayjs.Dayjs | null>(dayjs());

  const { data: employee, isLoading } = useEmployeeDetail(sabun || '');
  const updateMutation = useUpdateEmployee();
  const deleteMutation = useDeleteEmployee();

  const handleUpdate = (values: Partial<Employee>) => {
    if (!sabun) return;
    updateMutation.mutate(
      { sabun, data: values },
      { onSuccess: () => setEditOpen(false) },
    );
  };

  const handleRetire = () => {
    if (!sabun) return;
    deleteMutation.mutate(
      { sabun, retYmd: retireDate?.format('YYYYMMDD') },
      {
        onSuccess: () => {
          setRetireOpen(false);
          navigate('/employee');
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Title level={5}>사원 정보를 찾을 수 없습니다.</Title>
        <Button onClick={() => navigate('/employee')}>목록으로</Button>
      </div>
    );
  }

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/employee')}>
              목록
            </Button>
            <Title level={4} style={{ margin: 0 }}>사원 상세</Title>
          </Space>
        </Col>
        <Col>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => setEditOpen(true)}
              disabled={employee.statusCd === '30'}
            >
              수정
            </Button>
            {employee.statusCd !== '30' && (
              <Button
                icon={<StopOutlined />}
                danger
                onClick={() => setRetireOpen(true)}
              >
                퇴직 처리
              </Button>
            )}
          </Space>
        </Col>
      </Row>

      <Card>
        <Descriptions bordered column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label="사번">{employee.sabun}</Descriptions.Item>
          <Descriptions.Item label="상태">{getStatusTag(employee.statusCd, employee.statusNm)}</Descriptions.Item>
          <Descriptions.Item label="한글성명">{employee.korNm}</Descriptions.Item>
          <Descriptions.Item label="영문성명">{employee.engNm || '-'}</Descriptions.Item>
          <Descriptions.Item label="성별">
            {employee.sexType === 'M' ? '남성' : employee.sexType === 'F' ? '여성' : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="입사일자">{formatDate(employee.empYmd)}</Descriptions.Item>
          {employee.retYmd && (
            <Descriptions.Item label="퇴직일자">{formatDate(employee.retYmd)}</Descriptions.Item>
          )}
          <Descriptions.Item label="이메일">{employee.email || '-'}</Descriptions.Item>
          <Descriptions.Item label="연락처">{employee.hpNo || '-'}</Descriptions.Item>
          <Descriptions.Item label="부서">{employee.deptNm || employee.deptCd || '-'}</Descriptions.Item>
          <Descriptions.Item label="직급">{employee.rankNm || employee.rankCd || '-'}</Descriptions.Item>
          <Descriptions.Item label="직책">{employee.positionNm || employee.positionCd || '-'}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 수정 모달 */}
      <EmployeeFormModal
        open={editOpen}
        employee={employee}
        loading={updateMutation.isPending}
        onOk={handleUpdate}
        onCancel={() => setEditOpen(false)}
      />

      {/* 퇴직 처리 모달 */}
      <Modal
        title="퇴직 처리"
        open={retireOpen}
        onOk={handleRetire}
        onCancel={() => setRetireOpen(false)}
        okText="퇴직 처리"
        okButtonProps={{ danger: true }}
        cancelText="취소"
        confirmLoading={deleteMutation.isPending}
      >
        <p>
          <strong>{employee.korNm}</strong> ({employee.sabun}) 사원을 퇴직 처리하시겠습니까?
        </p>
        <p>퇴직일자를 선택하세요:</p>
        <DatePicker
          value={retireDate}
          onChange={setRetireDate}
          style={{ width: '100%' }}
          format="YYYY-MM-DD"
        />
      </Modal>
    </div>
  );
}

export default EmployeeDetail;
