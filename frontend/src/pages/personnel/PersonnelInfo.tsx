import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tabs, Button, Space, Typography, Row, Col, Spin, Select, Input } from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useEmployeeList } from '../../hooks/useEmployee';
import FamilyTab from './tabs/FamilyTab';
import LicenseTab from './tabs/LicenseTab';
import EducationTab from './tabs/EducationTab';
import MilitaryTab from './tabs/MilitaryTab';
import ContactTab from './tabs/ContactTab';
import AwardTab from './tabs/AwardTab';
import DisciplineTab from './tabs/DisciplineTab';
import PersonnelBasicTab from './tabs/PersonnelBasicTab';

const { Title } = Typography;

function PersonnelInfo() {
  const { sabun: paramSabun } = useParams<{ sabun: string }>();
  const navigate = useNavigate();
  const [selectedSabun, setSelectedSabun] = useState(paramSabun || '');
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data: employeeData } = useEmployeeList({ page: 0, size: 200, keyword: searchKeyword });
  const employees = employeeData?.content || [];

  const sabun = selectedSabun;

  const tabItems = [
    { key: 'basic', label: '인사정보', children: <PersonnelBasicTab sabun={sabun} /> },
    { key: 'family', label: '가족', children: <FamilyTab sabun={sabun} /> },
    { key: 'license', label: '자격증', children: <LicenseTab sabun={sabun} /> },
    { key: 'education', label: '학력', children: <EducationTab sabun={sabun} /> },
    { key: 'military', label: '병역', children: <MilitaryTab sabun={sabun} /> },
    { key: 'contact', label: '연락처', children: <ContactTab sabun={sabun} /> },
    { key: 'award', label: '포상', children: <AwardTab sabun={sabun} /> },
    { key: 'discipline', label: '징계', children: <DisciplineTab sabun={sabun} /> },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/employee')}>
              사원목록
            </Button>
            <Title level={4} style={{ margin: 0 }}>인사기본</Title>
          </Space>
        </Col>
        <Col>
          <Space>
            <Input
              placeholder="사원 검색"
              prefix={<SearchOutlined />}
              style={{ width: 160 }}
              allowClear
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Select
              showSearch
              style={{ width: 280 }}
              placeholder="사원을 선택하세요"
              optionFilterProp="label"
              value={sabun || undefined}
              onChange={(val) => setSelectedSabun(val)}
              options={employees.map((emp) => ({
                value: emp.sabun,
                label: `${emp.korNm} (${emp.sabun})`,
              }))}
            />
          </Space>
        </Col>
      </Row>

      {sabun ? (
        <Card>
          <Tabs items={tabItems} />
        </Card>
      ) : (
        <Card>
          <div style={{ textAlign: 'center', padding: 60 }}>
            <Spin size="large" />
            <p style={{ marginTop: 16, color: '#999' }}>사원을 선택해주세요</p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default PersonnelInfo;
