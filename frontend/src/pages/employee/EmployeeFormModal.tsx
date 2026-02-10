import { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import dayjs from 'dayjs';
import type { Employee } from '../../api/employeeApi';
import { useCodeMap } from '../../hooks/useCommonCode';

interface EmployeeFormModalProps {
  open: boolean;
  employee?: Employee | null;
  loading?: boolean;
  onOk: (values: Partial<Employee>) => void;
  onCancel: () => void;
}

function EmployeeFormModal({ open, employee, loading, onOk, onCancel }: EmployeeFormModalProps) {
  const [form] = Form.useForm();
  const isEdit = !!employee;
  const { getCodeOptions } = useCodeMap();

  useEffect(() => {
    if (open) {
      if (employee) {
        form.setFieldsValue({
          ...employee,
          empYmd: employee.empYmd ? dayjs(employee.empYmd, 'YYYYMMDD') : undefined,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ enterCd: 'BS', statusCd: '10' });
      }
    }
  }, [open, employee, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const submitData: Partial<Employee> = {
        ...values,
        empYmd: values.empYmd ? values.empYmd.format('YYYYMMDD') : undefined,
      };
      onOk(submitData);
    } catch {
      // validation failed
    }
  };

  return (
    <Modal
      title={isEdit ? '사원 정보 수정' : '사원 등록'}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText={isEdit ? '수정' : '등록'}
      cancelText="취소"
      confirmLoading={loading}
      width={640}
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
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
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="sexType"
              label="성별"
              rules={[{ required: true, message: '성별을 선택하세요' }]}
            >
              <Select placeholder="성별 선택" options={getCodeOptions('SEX_TYPE')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="empYmd"
              label="입사일자"
              rules={[{ required: true, message: '입사일자를 선택하세요' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="입사일자 선택" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
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

        <Form.Item name="enterCd" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EmployeeFormModal;
