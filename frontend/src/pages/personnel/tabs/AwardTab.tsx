import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAwards, useSaveAward, useDeleteAward } from '../../../hooks/usePersonnel';

export default function AwardTab({ sabun }: { sabun: string }) {
  const { data = [], isLoading } = useAwards(sabun);
  const saveMutation = useSaveAward(sabun);
  const deleteMutation = useDeleteAward(sabun);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async () => {
    const values = await form.validateFields();
    saveMutation.mutate({ ...values, enterCd: 'BS', sabun }, {
      onSuccess: () => { setOpen(false); form.resetFields(); },
    });
  };

  const columns = [
    { title: '포상일', dataIndex: 'prizeYmd', width: 100 },
    { title: '포상기관', dataIndex: 'prizeOfficeNm', width: 140 },
    { title: '포상사유', dataIndex: 'memo2' },
    { title: '비고', dataIndex: 'note', width: 150 },
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
      <Modal title="포상 추가" open={open} onOk={handleSave} onCancel={() => setOpen(false)} okText="저장" cancelText="취소" confirmLoading={saveMutation.isPending} destroyOnClose>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="prizeYmd" label="포상일" rules={[{ required: true }]}><Input placeholder="20240101" /></Form.Item>
          <Form.Item name="prizeOfficeNm" label="포상기관"><Input /></Form.Item>
          <Form.Item name="memo2" label="포상사유"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="note" label="비고"><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
