import { useState, useMemo } from 'react';
import {
  Card,
  Table,
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
  InputNumber,
  List,
  Popconfirm,
  Empty,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  MenuOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MainMenu, MenuItem } from '../../api/menuApi';
import {
  useMainMenus,
  useSaveMainMenu,
  useDeleteMainMenu,
  useMenuItems,
  useSaveMenuItem,
  useDeleteMenuItem,
} from '../../hooks/useMenu';

const { Title, Text } = Typography;

/** 아이콘 옵션 목록 */
const ICON_OPTIONS = [
  { value: 'DashboardOutlined', label: 'Dashboard' },
  { value: 'UserOutlined', label: 'User' },
  { value: 'TeamOutlined', label: 'Team' },
  { value: 'DollarOutlined', label: 'Dollar' },
  { value: 'CalendarOutlined', label: 'Calendar' },
  { value: 'SettingOutlined', label: 'Setting' },
  { value: 'IdcardOutlined', label: 'ID Card' },
  { value: 'AppstoreOutlined', label: 'Appstore' },
];

function MenuManagement() {
  // 선택된 대메뉴
  const [selectedMainMenu, setSelectedMainMenu] = useState<string>('');

  // 대메뉴 모달
  const [mainModalOpen, setMainModalOpen] = useState(false);
  const [editMainMenu, setEditMainMenu] = useState<MainMenu | null>(null);
  const [mainForm] = Form.useForm();

  // 서브메뉴 모달
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [editSubMenu, setEditSubMenu] = useState<MenuItem | null>(null);
  const [subForm] = Form.useForm();

  // React Query
  const { data: mainMenus, isLoading: mainLoading } = useMainMenus();
  const saveMainMutation = useSaveMainMenu();
  const deleteMainMutation = useDeleteMainMenu();

  const { data: menuItems, isLoading: itemsLoading } = useMenuItems(selectedMainMenu);
  const saveItemMutation = useSaveMenuItem(selectedMainMenu);
  const deleteItemMutation = useDeleteMenuItem(selectedMainMenu);

  // 선택된 대메뉴 정보
  const selectedMainInfo = useMemo(
    () => mainMenus?.find((m) => m.mainMenuCd === selectedMainMenu),
    [mainMenus, selectedMainMenu],
  );

  // ===== 대메뉴 핸들러 =====

  const handleAddMainMenu = () => {
    setEditMainMenu(null);
    mainForm.resetFields();
    mainForm.setFieldsValue({
      enterCd: 'BS',
      useYn: 'Y',
      seq: (mainMenus?.length || 0) + 1,
    });
    setMainModalOpen(true);
  };

  const handleEditMainMenu = (menu: MainMenu) => {
    setEditMainMenu(menu);
    mainForm.setFieldsValue({
      enterCd: menu.enterCd,
      mainMenuCd: menu.mainMenuCd,
      mainMenuNm: menu.mainMenuNm,
      seq: menu.seq,
      iconClass: menu.iconClass,
      useYn: menu.useYn,
    });
    setMainModalOpen(true);
  };

  const handleSaveMainMenu = async () => {
    try {
      const values = await mainForm.validateFields();
      saveMainMutation.mutate(values, {
        onSuccess: () => setMainModalOpen(false),
      });
    } catch {
      // validation failed
    }
  };

  const handleDeleteMainMenu = (mainMenuCd: string) => {
    deleteMainMutation.mutate(mainMenuCd, {
      onSuccess: () => {
        if (selectedMainMenu === mainMenuCd) {
          setSelectedMainMenu('');
        }
      },
    });
  };

  // ===== 서브메뉴 핸들러 =====

  const handleAddSubMenu = () => {
    setEditSubMenu(null);
    subForm.resetFields();
    subForm.setFieldsValue({
      enterCd: 'BS',
      mainMenuCd: selectedMainMenu,
      priorMenuCd: selectedMainMenu,
      menuSeq: 1,
      type: 'P',
      seq: (menuItems?.length || 0) + 1,
    });
    setSubModalOpen(true);
  };

  const handleEditSubMenu = (item: MenuItem) => {
    setEditSubMenu(item);
    subForm.setFieldsValue({
      enterCd: item.enterCd,
      mainMenuCd: item.mainMenuCd,
      priorMenuCd: item.priorMenuCd,
      menuCd: item.menuCd,
      menuSeq: item.menuSeq,
      menuNm: item.menuNm,
      type: item.type,
      prgCd: item.prgCd,
      seq: item.seq,
      iconClass: item.iconClass,
    });
    setSubModalOpen(true);
  };

  const handleSaveSubMenu = async () => {
    try {
      const values = await subForm.validateFields();
      saveItemMutation.mutate(values, {
        onSuccess: () => setSubModalOpen(false),
      });
    } catch {
      // validation failed
    }
  };

  const handleDeleteSubMenu = (item: MenuItem) => {
    deleteItemMutation.mutate({
      enterCd: item.enterCd,
      mainMenuCd: item.mainMenuCd,
      priorMenuCd: item.priorMenuCd,
      menuCd: item.menuCd,
      menuSeq: item.menuSeq,
    });
  };

  // 서브메뉴 테이블 컬럼
  const subColumns: ColumnsType<MenuItem & { key: string }> = [
    {
      title: '순서',
      dataIndex: 'seq',
      key: 'seq',
      width: 70,
      align: 'center',
    },
    {
      title: '메뉴코드',
      dataIndex: 'menuCd',
      key: 'menuCd',
      width: 100,
    },
    {
      title: '메뉴명',
      dataIndex: 'menuNm',
      key: 'menuNm',
      width: 150,
    },
    {
      title: 'URL',
      dataIndex: 'prgCd',
      key: 'prgCd',
      width: 200,
      render: (val: string) => (
        <Text code style={{ fontSize: 12 }}>{val || '-'}</Text>
      ),
    },
    {
      title: '유형',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      align: 'center',
      render: (val: string) => (
        <Tag color={val === 'P' ? 'blue' : 'green'}>
          {val === 'P' ? '프로그램' : '폴더'}
        </Tag>
      ),
    },
    {
      title: '아이콘',
      dataIndex: 'iconClass',
      key: 'iconClass',
      width: 120,
      render: (val: string) => val || '-',
    },
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
            onClick={() => handleEditSubMenu(record)}
          >
            수정
          </Button>
          <Popconfirm
            title="삭제하시겠습니까?"
            onConfirm={() => handleDeleteSubMenu(record)}
            okText="삭제"
            cancelText="취소"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              삭제
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const subTableData = useMemo(
    () =>
      (menuItems || []).map((item) => ({
        ...item,
        key: `${item.menuCd}_${item.menuSeq}`,
      })),
    [menuItems],
  );

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>
        <MenuOutlined style={{ marginRight: 8 }} />
        메뉴관리
      </Title>

      <Row gutter={16}>
        {/* ===== 좌측: 대메뉴 리스트 ===== */}
        <Col xs={24} md={8} lg={6}>
          <Card
            title="대메뉴"
            size="small"
            extra={
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={handleAddMainMenu}
              >
                추가
              </Button>
            }
            styles={{ body: { padding: 0 } }}
          >
            <List
              loading={mainLoading}
              dataSource={mainMenus || []}
              locale={{ emptyText: '대메뉴가 없습니다.' }}
              renderItem={(menu) => (
                <List.Item
                  style={{
                    padding: '10px 16px',
                    cursor: 'pointer',
                    background:
                      selectedMainMenu === menu.mainMenuCd
                        ? '#e6f4ff'
                        : 'transparent',
                  }}
                  onClick={() => setSelectedMainMenu(menu.mainMenuCd)}
                  actions={[
                    <Button
                      key="edit"
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditMainMenu(menu);
                      }}
                    />,
                    <Popconfirm
                      key="del"
                      title={`"${menu.mainMenuNm}" 대메뉴를 삭제하시겠습니까? 하위 서브메뉴도 함께 삭제됩니다.`}
                      onConfirm={(e) => {
                        e?.stopPropagation();
                        handleDeleteMainMenu(menu.mainMenuCd);
                      }}
                      onCancel={(e) => e?.stopPropagation()}
                      okText="삭제"
                      cancelText="취소"
                    >
                      <Button
                        key="del-btn"
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <AppstoreOutlined
                        style={{ fontSize: 18, color: '#1890ff' }}
                      />
                    }
                    title={
                      <Space size={4}>
                        <Text strong>{menu.mainMenuNm}</Text>
                        <Tag
                          color={menu.useYn === 'Y' ? 'green' : 'default'}
                          style={{ fontSize: 11 }}
                        >
                          {menu.useYn === 'Y' ? '사용' : '미사용'}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {menu.mainMenuCd} · 순서 {menu.seq}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* ===== 우측: 서브메뉴 테이블 ===== */}
        <Col xs={24} md={16} lg={18}>
          <Card
            title={
              selectedMainInfo
                ? `${selectedMainInfo.mainMenuNm} 서브메뉴`
                : '서브메뉴'
            }
            size="small"
            extra={
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={handleAddSubMenu}
                disabled={!selectedMainMenu}
              >
                서브메뉴 추가
              </Button>
            }
          >
            {!selectedMainMenu ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="좌측에서 대메뉴를 선택하세요"
              />
            ) : (
              <Table
                columns={subColumns}
                dataSource={subTableData}
                loading={itemsLoading}
                pagination={false}
                scroll={{ x: 800 }}
                size="middle"
                locale={{ emptyText: '서브메뉴가 없습니다.' }}
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* ===== 대메뉴 등록/수정 모달 ===== */}
      <Modal
        title={editMainMenu ? '대메뉴 수정' : '대메뉴 등록'}
        open={mainModalOpen}
        onOk={handleSaveMainMenu}
        onCancel={() => setMainModalOpen(false)}
        okText={editMainMenu ? '수정' : '등록'}
        cancelText="취소"
        confirmLoading={saveMainMutation.isPending}
        width={500}
        destroyOnClose
      >
        <Form form={mainForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="mainMenuCd"
                label="대메뉴 코드"
                rules={[{ required: true, message: '대메뉴 코드를 입력하세요' }]}
              >
                <Input
                  placeholder="M01"
                  disabled={!!editMainMenu}
                  maxLength={10}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mainMenuNm"
                label="대메뉴명"
                rules={[{ required: true, message: '대메뉴명을 입력하세요' }]}
              >
                <Input placeholder="시스템관리" maxLength={100} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="seq"
                label="순서"
                rules={[{ required: true, message: '순서를 입력하세요' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="iconClass" label="아이콘">
                <Select placeholder="선택" allowClear>
                  {ICON_OPTIONS.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="useYn" label="사용여부">
                <Select>
                  <Select.Option value="Y">사용</Select.Option>
                  <Select.Option value="N">미사용</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="enterCd" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* ===== 서브메뉴 등록/수정 모달 ===== */}
      <Modal
        title={editSubMenu ? '서브메뉴 수정' : '서브메뉴 등록'}
        open={subModalOpen}
        onOk={handleSaveSubMenu}
        onCancel={() => setSubModalOpen(false)}
        okText={editSubMenu ? '수정' : '등록'}
        cancelText="취소"
        confirmLoading={saveItemMutation.isPending}
        width={560}
        destroyOnClose
      >
        <Form form={subForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="menuCd"
                label="메뉴코드"
                rules={[{ required: true, message: '메뉴코드를 입력하세요' }]}
              >
                <Input
                  placeholder="S001"
                  disabled={!!editSubMenu}
                  maxLength={10}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="menuNm"
                label="메뉴명"
                rules={[{ required: true, message: '메뉴명을 입력하세요' }]}
              >
                <Input placeholder="메뉴관리" maxLength={100} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="prgCd" label="URL (경로)">
                <Input placeholder="/system/menu" maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label="유형">
                <Select>
                  <Select.Option value="P">프로그램</Select.Option>
                  <Select.Option value="F">폴더</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="seq"
                label="순서"
                rules={[{ required: true, message: '순서를 입력하세요' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="iconClass" label="아이콘">
                <Select placeholder="선택" allowClear>
                  {ICON_OPTIONS.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="menuSeq" label="메뉴SEQ">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          {/* hidden fields */}
          <Form.Item name="enterCd" hidden><Input /></Form.Item>
          <Form.Item name="mainMenuCd" hidden><Input /></Form.Item>
          <Form.Item name="priorMenuCd" hidden><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MenuManagement;
