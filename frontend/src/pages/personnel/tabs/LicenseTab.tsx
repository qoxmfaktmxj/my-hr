import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useLicenses, useSaveLicense, useDeleteLicense } from '../../../hooks/usePersonnel';

export default function LicenseTab({ sabun }: { sabun: string }) {
  const { data = [], isLoading } = useLicenses(sabun);
  const saveMutation = useSaveLicense(sabun);
  const deleteMutation = useDeleteLicense(sabun);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async () => {
    const values = await form.validateFields();
    saveMutation.mutate({ ...values, enterCd: 'BS', sabun }, {
      onSuccess: () => { setOpen(false); form.resetFields(); },
    });
  };

  const columns = [
    { title: '자격증명', dataIndex: 'licenseNm', width: 180 },
    { title: '등급', dataIndex: 'licenseGrade', width: 100 },
    { title: '자격번호', dataIndex: 'licenseNo', width: 150 },
    { title: '취득일', dataIndex: 'licSYmd', width: 100 },
    { title: '만료일', dataIndex: 'licEYmd', width: 100 },
    { title: '발행기관', dataIndex: 'officeCd', width: 150 },
    { title: '비고', dataIndex: 'licenseBigo' },
    {
      title: '', width: 60,
      render: (_: unknown, record: { seq?: number }) => (
        <Popconfirm title="삭제하시겠습니까?" onConfirm={() => record.seq && deleteMutation.mutate(record.seq)}>
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 12, textAlign: 'right' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>추가</Button>
      </div>
      <Table dataSource={data} columns={columns} rowKey="seq" loading={isLoading} size="small" pagination={false} />
      <Modal title="자격증 추가" open={open} onOk={handleSave} onCancel={() => setOpen(false)} okText="저장" cancelText="취소" confirmLoading={saveMutation.isPending} destroyOnClose>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="licenseNm" label="자격증명" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="licenseGrade" label="등급"><Input /></Form.Item>
          <Form.Item name="licenseNo" label="자격번호"><Input /></Form.Item>
          <Form.Item name="licSYmd" label="취득일"><Input placeholder="20240101" /></Form.Item>
          <Form.Item name="licEYmd" label="만료일"><Input placeholder="20290101" /></Form.Item>
          <Form.Item name="officeCd" label="발행기관"><Input /></Form.Item>
          <Form.Item name="licenseBigo" label="비고"><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
