import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFamilies, useSaveFamily, useDeleteFamily } from '../../../hooks/usePersonnel';
import type { Family } from '../../../api/personnelApi';

const FAM_CD_OPTIONS = [
  { value: '01', label: '모' }, { value: '02', label: '부' },
  { value: '03', label: '자녀' }, { value: '04', label: '배우자' },
  { value: '05', label: '형제' }, { value: '99', label: '기타' },
];

export default function FamilyTab({ sabun }: { sabun: string }) {
  const { data = [], isLoading } = useFamilies(sabun);
  const saveMutation = useSaveFamily(sabun);
  const deleteMutation = useDeleteFamily(sabun);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async () => {
    const values = await form.validateFields();
    saveMutation.mutate({ ...values, enterCd: 'BS', sabun, sdate: values.sdate || new Date().toISOString().slice(0, 10).replace(/-/g, '') }, {
      onSuccess: () => { setOpen(false); form.resetFields(); },
    });
  };

  const columns = [
    { title: '성명', dataIndex: 'famNm', width: 100 },
    { title: '관계', dataIndex: 'famCd', width: 80, render: (v: string) => FAM_CD_OPTIONS.find(o => o.value === v)?.label || v },
    { title: '생년월일', dataIndex: 'famYmd', width: 100 },
    { title: '성별', dataIndex: 'sexType', width: 60, render: (v: string) => v === 'M' ? '남' : v === 'F' ? '여' : '-' },
    { title: '연락처', dataIndex: 'telNo', width: 130 },
    { title: '동거', dataIndex: 'famYn', width: 60, render: (v: string) => v === 'Y' ? '예' : '아니오' },
    { title: '비고', dataIndex: 'note' },
    {
      title: '', width: 60,
      render: (_: unknown, record: Family) => (
        <Popconfirm title="삭제하시겠습니까?" onConfirm={() => deleteMutation.mutate({ enterCd: record.enterCd, sabun: record.sabun, famNm: record.famNm, famCd: record.famCd, sdate: record.sdate })}>
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
      <Table dataSource={data} columns={columns} rowKey={(r) => `${r.famNm}-${r.famCd}-${r.sdate}`} loading={isLoading} size="small" pagination={false} />
      <Modal title="가족 추가" open={open} onOk={handleSave} onCancel={() => setOpen(false)} okText="저장" cancelText="취소" confirmLoading={saveMutation.isPending} destroyOnClose>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item name="famNm" label="성명" rules={[{ required: true }]} style={{ flex: 1 }}><Input /></Form.Item>
            <Form.Item name="famCd" label="관계" rules={[{ required: true }]} style={{ width: 120 }}>
              <Select options={FAM_CD_OPTIONS} />
            </Form.Item>
          </Space.Compact>
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item name="famYmd" label="생년월일" style={{ flex: 1 }}><Input placeholder="19900101" /></Form.Item>
            <Form.Item name="sexType" label="성별" style={{ width: 100 }}>
              <Select options={[{ value: 'M', label: '남' }, { value: 'F', label: '여' }]} />
            </Form.Item>
          </Space.Compact>
          <Form.Item name="telNo" label="연락처"><Input placeholder="010-1234-5678" /></Form.Item>
          <Form.Item name="famYn" label="동거여부" initialValue="Y">
            <Select options={[{ value: 'Y', label: '예' }, { value: 'N', label: '아니오' }]} />
          </Form.Item>
          <Form.Item name="note" label="비고"><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
