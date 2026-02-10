import { useEffect } from 'react';
import { Form, Input, Select, Button, Spin, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useMilitary, useSaveMilitary } from '../../../hooks/usePersonnel';
import { useCodeMap } from '../../../hooks/useCommonCode';

export default function MilitaryTab({ sabun }: { sabun: string }) {
  const { data, isLoading } = useMilitary(sabun);
  const saveMutation = useSaveMilitary(sabun);
  const [form] = Form.useForm();
  const { getCodeOptions } = useCodeMap();

  useEffect(() => {
    if (data) form.setFieldsValue(data);
    else form.resetFields();
  }, [data, form]);

  const handleSave = async () => {
    const values = await form.validateFields();
    saveMutation.mutate({ ...values, enterCd: 'BS', sabun });
  };

  if (isLoading) return <Spin />;

  return (
    <div>
      <div style={{ marginBottom: 12, textAlign: 'right' }}>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={saveMutation.isPending}>저장</Button>
      </div>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="transferCd" label="병역구분"><Select options={getCodeOptions('ARMY_TRANSFER')} placeholder="선택" /></Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="armyCd" label="군별"><Select options={getCodeOptions('ARMY_CD')} placeholder="선택" /></Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="armyGradeCd" label="계급"><Input placeholder="병장, 상병 등" /></Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="armyNo" label="군번"><Input /></Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="armySYmd" label="입대일"><Input placeholder="20200101" /></Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="armyEYmd" label="제대일"><Input placeholder="20211231" /></Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="armyUnitNm" label="부대명"><Input /></Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="dischargeCd" label="전역구분"><Input placeholder="만기전역 등" /></Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="armyMemo" label="비고"><Input /></Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
