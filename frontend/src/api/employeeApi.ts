import api from './axios';

// 타입 정의 (Backend DTO와 일치)
export interface Employee {
  sabun: string;
  enterCd: string;
  korNm: string;
  engNm?: string;
  sexType?: string;
  empYmd?: string;       // 입사일자
  retYmd?: string;       // 퇴사일자
  email?: string;
  hpNo?: string;         // 휴대폰번호
  statusCd?: string;     // 재직상태코드 (10:재직, 20:휴직, 30:퇴직)
  statusNm?: string;     // 재직상태명
  deptCd?: string;       // 부서코드
  deptNm?: string;       // 부서명
  positionCd?: string;   // 직책코드
  positionNm?: string;   // 직책명
  rankCd?: string;       // 직급코드
  rankNm?: string;       // 직급명
}

export interface EmployeeListResponse {
  content: Employee[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface EmployeeSearchParams {
  page?: number;
  size?: number;
  keyword?: string;
  deptCd?: string;
  empStatus?: string;
}

// 사원 목록 조회
export const getEmployees = async (params?: EmployeeSearchParams): Promise<EmployeeListResponse> => {
  const response = await api.get('/employees', { params });
  return response.data;
};

// 사원 상세 조회
export const getEmployee = async (sabun: string): Promise<Employee> => {
  const response = await api.get(`/employees/${sabun}`);
  return response.data;
};

// 사원 등록
export const createEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await api.post('/employees', employee);
  return response.data;
};

// 사원 수정
export const updateEmployee = async (sabun: string, employee: Partial<Employee>): Promise<Employee> => {
  const response = await api.put(`/employees/${sabun}`, employee);
  return response.data;
};

// 사원 삭제
export const deleteEmployee = async (sabun: string): Promise<void> => {
  await api.delete(`/employees/${sabun}`);
};

// 사원 수 조회 (통계용)
export const getEmployeeCount = async (): Promise<number> => {
  const response = await api.get('/employees/count');
  return response.data;
};
