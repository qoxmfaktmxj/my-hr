import { Descriptions, Tag, Spin } from 'antd';
import { useEmployeeDetail } from '../../../hooks/useEmployee';

function formatDate(ymd?: string) {
  if (!ymd || ymd.length !== 8) return '-';
  return `${ymd.substring(0, 4)}-${ymd.substring(4, 6)}-${ymd.substring(6, 8)}`;
}

export default function PersonnelBasicTab({ sabun }: { sabun: string }) {
  const { data: emp, isLoading } = useEmployeeDetail(sabun);

  if (isLoading) return <Spin />;
  if (!emp) return <p>사원 정보 없음</p>;

  return (
    <Descriptions bordered column={{ xs: 1, sm: 2 }} size="small">
      <Descriptions.Item label="사번">{emp.sabun}</Descriptions.Item>
      <Descriptions.Item label="상태">
        {emp.statusCd === '10' ? <Tag color="green">{emp.statusNm || '재직'}</Tag> :
         emp.statusCd === '20' ? <Tag color="orange">{emp.statusNm || '휴직'}</Tag> :
         emp.statusCd === '30' ? <Tag color="red">{emp.statusNm || '퇴직'}</Tag> :
         <Tag>{emp.statusNm || '-'}</Tag>}
      </Descriptions.Item>
      <Descriptions.Item label="한글성명">{emp.korNm}</Descriptions.Item>
      <Descriptions.Item label="영문성명">{emp.engNm || '-'}</Descriptions.Item>
      <Descriptions.Item label="성별">{emp.sexType === 'M' ? '남성' : emp.sexType === 'F' ? '여성' : '-'}</Descriptions.Item>
      <Descriptions.Item label="입사일자">{formatDate(emp.empYmd)}</Descriptions.Item>
      {emp.retYmd && <Descriptions.Item label="퇴직일자">{formatDate(emp.retYmd)}</Descriptions.Item>}
      <Descriptions.Item label="이메일">{emp.email || '-'}</Descriptions.Item>
      <Descriptions.Item label="연락처">{emp.hpNo || '-'}</Descriptions.Item>
      <Descriptions.Item label="부서">{emp.deptNm || '-'}</Descriptions.Item>
      <Descriptions.Item label="직급">{emp.rankNm || '-'}</Descriptions.Item>
      <Descriptions.Item label="직책">{emp.positionNm || '-'}</Descriptions.Item>
    </Descriptions>
  );
}
