import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEducations, useSaveEducation, useDeleteEducation } from '../../../hooks/usePersonnel';
import { useCodeMap } from '../../../hooks/useCommonCode';

export default function EducationTab({ sabun }: { sabun: string }) {
  const { data = [], isLoading } = useEducations(sabun);
  const saveMutation = useSaveEducation(sabun);
  const deleteMutation = useDeleteEducation(sabun);
  const { getCodeName, getCodeOptions } = useCodeMap();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async () => {
    const values = await form.validateFields();
    saveMutation.mutate({ ...values, enterCd: 'BS', sabun }, {
      onSuccess: () => { setOpen(false); form.resetFields(); },
    });
  };

  const columns = [
    { title: '학교명', dataIndex: 'acaSchNm', width: 160 },
    { title: '전공', dataIndex: 'acamajNm', width: 140 },
    { title: '입학일', dataIndex: 'acaSYm', width: 100 },
    { title: '졸업일', dataIndex: 'acaEYm', width: 100 },
    { title: '졸업구분', dataIndex: 'acaYn', width: 80, render: (v: string) => getCodeName('EDU_STATUS', v) || v },
    { title: '최종학력', dataIndex: 'acaType', width: 80, render: (v: string) => v === 'Y' ? '예' : '아니오' },
    { title: '비고', dataIndex: 'note' },
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
      <Modal title="학력 추가" open={open} onOk={handleSave} onCancel={() => setOpen(false)} okText="저장" cancelText="취소" confirmLoading={saveMutation.isPending} destroyOnClose>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="acaSchNm" label="학교명" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="acamajNm" label="전공"><Input /></Form.Item>
          <Form.Item name="acaSYm" label="입학일"><Input placeholder="20180301" /></Form.Item>
          <Form.Item name="acaEYm" label="졸업일"><Input placeholder="20220228" /></Form.Item>
          <Form.Item name="acaYn" label="졸업구분"><Select options={getCodeOptions('EDU_STATUS')} /></Form.Item>
          <Form.Item name="acaType" label="최종학력여부">
            <Select options={[{ value: 'Y', label: '예' }, { value: 'N', label: '아니오' }]} />
          </Form.Item>
          <Form.Item name="note" label="비고"><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
