import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Tabs,
  Space,
  Typography,
} from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCreateEmployee } from '../../hooks/useEmployee';
import { useOrganizationList } from '../../hooks/useOrganization';
import type { Employee } from '../../api/employeeApi';

const { Title } = Typography;

function EmployeeRegister() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const createMutation = useCreateEmployee();
  const { data: organizations = [] } = useOrganizationList({ enterCd: 'BS' });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const submitData: Partial<Employee> = {
        ...values,
        enterCd: 'BS',
        empYmd: values.empYmd ? values.empYmd.format('YYYYMMDD') : undefined,
      };
      createMutation.mutate(submitData as Employee, {
        onSuccess: () => navigate('/employee'),
      });
    } catch {
      // validation failed
    }
  };

  const basicInfoTab = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="korNm"
          label="한글성명"
          rules={[{ required: true, message: '한글성명을 입력하세요' }]}
        >
          <Input placeholder="홍길동" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="engNm" label="영문성명">
          <Input placeholder="Hong Gildong" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="sexType"
          label="성별"
          rules={[{ required: true, message: '성별을 선택하세요' }]}
        >
          <Select placeholder="성별 선택">
            <Select.Option value="M">남성</Select.Option>
            <Select.Option value="F">여성</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="empYmd"
          label="입사일자"
          rules={[{ required: true, message: '입사일자를 선택하세요' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder="입사일자 선택"
            format="YYYY-MM-DD"
            defaultValue={dayjs()}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="email"
          label="이메일"
          rules={[{ type: 'email', message: '올바른 이메일을 입력하세요' }]}
        >
          <Input placeholder="example@company.com" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="hpNo"
          label="연락처"
          rules={[
            {
              pattern: /^\d{2,3}-\d{3,4}-\d{4}$/,
              message: '010-1234-5678 형식으로 입력하세요',
            },
          ]}
        >
          <Input placeholder="010-1234-5678" />
        </Form.Item>
      </Col>
    </Row>
  );

  const personnelInfoTab = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="deptCd" label="부서">
          <Select
            placeholder="부서 선택"
            showSearch
            optionFilterProp="label"
            options={organizations.map((org) => ({
              value: org.orgCd,
              label: org.orgNm,
            }))}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="rankCd" label="직급">
          <Input placeholder="직급 입력" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="positionCd" label="직위">
          <Input placeholder="직위 입력" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="jikchakCd" label="직책">
          <Input placeholder="직책 입력" />
        </Form.Item>
      </Col>
    </Row>
  );

  const tabItems = [
    { key: 'basic', label: '기본정보', children: basicInfoTab },
    { key: 'personnel', label: '인사정보', children: personnelInfoTab },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/employee')}>
              목록
            </Button>
            <Title level={4} style={{ margin: 0 }}>사원등록</Title>
          </Space>
        </Col>
        <Col>
          <Space>
            <Button onClick={() => navigate('/employee')}>취소</Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSubmit}
              loading={createMutation.isPending}
            >
              등록
            </Button>
          </Space>
        </Col>
      </Row>

      <Card>
        <Form form={form} layout="vertical">
          <Tabs items={tabItems} />
        </Form>
      </Card>
    </div>
  );
}

export default EmployeeRegister;
