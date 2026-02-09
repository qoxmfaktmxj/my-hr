import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContacts, useSaveContact, useDeleteContact } from '../../../hooks/usePersonnel';

const CONT_TYPE_OPTIONS = [
  { value: '01', label: '휴대폰' }, { value: '02', label: '자택전화' },
  { value: '03', label: '개인이메일' }, { value: '04', label: '비상연락처' },
  { value: '05', label: '자택주소' }, { value: '99', label: '기타' },
];

export default function ContactTab({ sabun }: { sabun: string }) {
  const { data = [], isLoading } = useContacts(sabun);
  const saveMutation = useSaveContact(sabun);
  const deleteMutation = useDeleteContact(sabun);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async () => {
    const values = await form.validateFields();
    saveMutation.mutate({ ...values, enterCd: 'BS', sabun }, {
      onSuccess: () => { setOpen(false); form.resetFields(); },
    });
  };

  const columns = [
    { title: '구분', dataIndex: 'contType', width: 120, render: (v: string) => CONT_TYPE_OPTIONS.find(o => o.value === v)?.label || v },
    { title: '연락처', dataIndex: 'contAddress' },
    {
      title: '', width: 60,
      render: (_: unknown, record: { contType: string }) => (
        <Popconfirm title="삭제하시겠습니까?" onConfirm={() => deleteMutation.mutate(record.contType)}>
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
      <Table dataSource={data} columns={columns} rowKey="contType" loading={isLoading} size="small" pagination={false} />
      <Modal title="연락처 추가" open={open} onOk={handleSave} onCancel={() => setOpen(false)} okText="저장" cancelText="취소" confirmLoading={saveMutation.isPending} destroyOnClose>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="contType" label="구분" rules={[{ required: true }]}>
            <Select options={CONT_TYPE_OPTIONS} placeholder="선택" />
          </Form.Item>
          <Form.Item name="contAddress" label="연락처" rules={[{ required: true }]}>
            <Input placeholder="전화번호, 이메일, 주소 등" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
