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
  Modal,
  Form,
  Select,
  Switch,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  StopOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import type { Organization, OrganizationCreateRequest } from '../../api/organizationApi';
import {
  useOrganizationList,
  useCreateOrganization,
  useUpdateOrganization,
  useDeactivateOrganization,
} from '../../hooks/useOrganization';

const { Title } = Typography;

interface TableOrganization extends Organization {
  key: string;
}

function DepartmentList() {
  // 검색 상태
  const [searchText, setSearchText] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [includeInactive, setIncludeInactive] = useState(false);

  // 모달 상태
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Organization | null>(null);
  const [deactivateTarget, setDeactivateTarget] = useState<Organization | null>(null);

  const [form] = Form.useForm();

  // React Query
  const { data, isLoading } = useOrganizationList({
    keyword: appliedSearch || undefined,
    includeInactive,
  });

  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization();
  const deactivateMutation = useDeactivateOrganization();

  // 테이블 데이터
  const tableData: TableOrganization[] = (data || []).map((org) => ({
    ...org,
    key: `${org.orgCd}_${org.sdate}`,
  }));

  const columns: ColumnsType<TableOrganization> = [
    { title: '조직코드', dataIndex: 'orgCd', key: 'orgCd', width: 100 },
    { title: '조직명', dataIndex: 'orgNm', key: 'orgNm', width: 140 },
    { title: '조직경로', dataIndex: 'orgFullNm', key: 'orgFullNm', width: 250 },
    { title: '영문명', dataIndex: 'orgEngNm', key: 'orgEngNm', width: 180 },
    {
      title: '조직유형',
      dataIndex: 'orgTypeNm',
      key: 'orgTypeNm',
      width: 100,
      render: (text: string, record) => {
        let color = 'default';
        switch (record.orgType) {
          case 'T001': color = 'red'; break;
          case 'T002': color = 'blue'; break;
          case 'T003': color = 'green'; break;
        }
        return <Tag color={color}>{text || record.orgType || '-'}</Tag>;
      },
    },
    { title: '전화번호', dataIndex: 'telNo', key: 'telNo', width: 140 },
    {
      title: '사용여부',
      dataIndex: 'visualYn',
      key: 'visualYn',
      width: 80,
      render: (val: string) => (
        <Tag color={val === 'Y' ? 'green' : 'default'}>
          {val === 'Y' ? '사용' : '미사용'}
        </Tag>
      ),
    },
    { title: '시작일', dataIndex: 'sdate', key: 'sdate', width: 100 },
    {
      title: '관리',
      key: 'action',
      width: 130,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            수정
          </Button>
          {record.visualYn === 'Y' && (
            <Button
              type="link"
              size="small"
              danger
              icon={<StopOutlined />}
              onClick={() => setDeactivateTarget(record)}
            >
              비활성
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 검색
  const handleSearch = () => {
    setAppliedSearch(searchText);
  };

  // 새로고침
  const handleRefresh = () => {
    setSearchText('');
    setAppliedSearch('');
  };

  // 등록 모달 열기
  const handleOpenCreate = () => {
    setEditTarget(null);
    form.resetFields();
    form.setFieldsValue({
      enterCd: 'BS',
      visualYn: 'Y',
      sdate: dayjs().format('YYYYMMDD'),
      edate: '99991231',
    });
    setFormOpen(true);
  };

  // 수정 모달 열기
  const handleEdit = (org: Organization) => {
    setEditTarget(org);
    form.setFieldsValue({
      enterCd: org.enterCd,
      orgCd: org.orgCd,
      orgNm: org.orgNm,
      orgFullNm: org.orgFullNm,
      orgEngNm: org.orgEngNm,
      orgType: org.orgType,
      objectType: org.objectType,
      telNo: org.telNo,
      coTelNo: org.coTelNo,
      mission: org.mission,
      visualYn: org.visualYn,
      sdate: org.sdate,
      edate: org.edate,
      memo: org.memo,
    });
    setFormOpen(true);
  };

  // 저장 (등록/수정)
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const request: OrganizationCreateRequest = { ...values };

      if (editTarget) {
        updateMutation.mutate(
          { orgCd: editTarget.orgCd, data: request },
          { onSuccess: () => setFormOpen(false) }
        );
      } else {
        createMutation.mutate(request, {
          onSuccess: () => setFormOpen(false),
        });
      }
    } catch {
      // validation failed
    }
  };

  // 비활성화
  const handleDeactivate = () => {
    if (!deactivateTarget) return;
    deactivateMutation.mutate(deactivateTarget.orgCd, {
      onSuccess: () => setDeactivateTarget(null),
    });
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>부서관리</Title>
        </Col>
        <Col>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              새로고침
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
              부서등록
            </Button>
          </Space>
        </Col>
      </Row>

      <Card>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="조직명 또는 조직코드 검색"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              allowClear
            />
          </Col>
          <Col>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              검색
            </Button>
          </Col>
          <Col>
            <Space>
              <span>미사용 포함</span>
              <Switch checked={includeInactive} onChange={setIncludeInactive} size="small" />
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={{ pageSize: 15, showTotal: (total) => `총 ${total}개` }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </Card>

      {/* 등록/수정 모달 */}
      <Modal
        title={editTarget ? '부서 수정' : '부서 등록'}
        open={formOpen}
        onOk={handleSave}
        onCancel={() => setFormOpen(false)}
        okText={editTarget ? '수정' : '등록'}
        cancelText="취소"
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        width={640}
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="orgCd"
                label="조직코드"
                rules={[{ required: true, message: '조직코드를 입력하세요' }]}
              >
                <Input placeholder="ORG001" disabled={!!editTarget} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="orgNm"
                label="조직명"
                rules={[{ required: true, message: '조직명을 입력하세요' }]}
              >
                <Input placeholder="인사팀" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="orgFullNm" label="조직경로 (Full Name)">
                <Input placeholder="경영지원본부 > 인사팀" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="orgEngNm" label="영문 조직명">
                <Input placeholder="HR Team" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="orgType" label="조직유형">
                <Select placeholder="조직유형 선택">
                  <Select.Option value="T001">대표이사</Select.Option>
                  <Select.Option value="T002">본부</Select.Option>
                  <Select.Option value="T003">팀</Select.Option>
                  <Select.Option value="T004">파트</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="telNo" label="대표전화번호">
                <Input placeholder="02-1234-5678" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="coTelNo" label="내선번호">
                <Input placeholder="5610" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sdate"
                label="시작일자"
                rules={[{ required: true, message: '시작일자를 입력하세요' }]}
              >
                <Input placeholder="20200101" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="visualYn" label="사용여부">
                <Select>
                  <Select.Option value="Y">사용</Select.Option>
                  <Select.Option value="N">미사용</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="mission" label="조직목적">
            <Input.TextArea rows={2} placeholder="조직의 목적을 입력하세요" />
          </Form.Item>

          <Form.Item name="memo" label="메모">
            <Input.TextArea rows={2} placeholder="메모" />
          </Form.Item>

          <Form.Item name="enterCd" hidden><Input /></Form.Item>
          <Form.Item name="edate" hidden><Input /></Form.Item>
          <Form.Item name="objectType" hidden><Input /></Form.Item>
        </Form>
      </Modal>

      {/* 비활성화 확인 모달 */}
      <Modal
        title="부서 비활성화"
        open={!!deactivateTarget}
        onOk={handleDeactivate}
        onCancel={() => setDeactivateTarget(null)}
        okText="비활성화"
        okButtonProps={{ danger: true }}
        cancelText="취소"
        confirmLoading={deactivateMutation.isPending}
      >
        {deactivateTarget && (
          <p>
            <strong>{deactivateTarget.orgNm}</strong> ({deactivateTarget.orgCd})
            부서를 비활성화하시겠습니까?
          </p>
        )}
      </Modal>
    </div>
  );
}

export default DepartmentList;
