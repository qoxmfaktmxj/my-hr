import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDisciplines, useSaveDiscipline, useDeleteDiscipline } from '../../../hooks/usePersonnel';

export default function DisciplineTab({ sabun }: { sabun: string }) {
  const { data = [], isLoading } = useDisciplines(sabun);
  const saveMutation = useSaveDiscipline(sabun);
  const deleteMutation = useDeleteDiscipline(sabun);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async () => {
    const values = await form.validateFields();
    saveMutation.mutate({ ...values, enterCd: 'BS', sabun }, {
      onSuccess: () => { setOpen(false); form.resetFields(); },
    });
  };

  const columns = [
    { title: '징계일', dataIndex: 'punishYmd', width: 100 },
    { title: '징계구분', dataIndex: 'punishGb', width: 100 },
    { title: '시작일', dataIndex: 'sdate', width: 100 },
    { title: '종료일', dataIndex: 'edate', width: 100 },
    { title: '징계사유', dataIndex: 'punishMemo' },
    { title: '비고', dataIndex: 'note', width: 120 },
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
      <Modal title="징계 추가" open={open} onOk={handleSave} onCancel={() => setOpen(false)} okText="저장" cancelText="취소" confirmLoading={saveMutation.isPending} destroyOnClose>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="punishYmd" label="징계일" rules={[{ required: true }]}><Input placeholder="20240101" /></Form.Item>
          <Form.Item name="punishGb" label="징계구분"><Input placeholder="경고, 견책 등" /></Form.Item>
          <Form.Item name="sdate" label="시작일"><Input placeholder="20240101" /></Form.Item>
          <Form.Item name="edate" label="종료일"><Input placeholder="20240201" /></Form.Item>
          <Form.Item name="punishMemo" label="징계사유"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="note" label="비고"><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
