import api from './axios';

// ========== Types ==========

export interface Organization {
  enterCd: string;
  orgCd: string;
  orgNm: string;
  orgFullNm?: string;
  orgEngNm?: string;
  orgType?: string;
  orgTypeNm?: string;
  objectType?: string;
  telNo?: string;
  coTelNo?: string;
  mission?: string;
  visualYn?: string;
  sdate?: string;
  edate?: string;
  workAreaCd?: string;
  workAreaNm?: string;
  memo?: string;
  memberCount?: number;
}

export interface OrganizationCreateRequest {
  enterCd: string;
  orgCd: string;
  orgNm: string;
  orgFullNm?: string;
  orgEngNm?: string;
  orgType?: string;
  objectType?: string;
  telNo?: string;
  coTelNo?: string;
  mission?: string;
  visualYn?: string;
  sdate: string;
  edate?: string;
  workAreaCd?: string;
  workAreaNm?: string;
  memo?: string;
}

// ========== API Functions ==========

/** 조직 목록 조회 */
export const getOrganizations = async (params?: {
  enterCd?: string;
  keyword?: string;
  includeInactive?: boolean;
}): Promise<Organization[]> => {
  const response = await api.get<Organization[]>('/organizations', { params });
  return response.data;
};

/** 조직 상세 조회 */
export const getOrganization = async (orgCd: string, enterCd?: string): Promise<Organization> => {
  const response = await api.get<Organization>(`/organizations/${orgCd}`, {
    params: { enterCd: enterCd || 'BS' },
  });
  return response.data;
};

/** 조직 등록 */
export const createOrganization = async (data: OrganizationCreateRequest): Promise<Organization> => {
  const response = await api.post<Organization>('/organizations', data);
  return response.data;
};

/** 조직 수정 */
export const updateOrganization = async (
  orgCd: string,
  data: OrganizationCreateRequest
): Promise<Organization> => {
  const response = await api.put<Organization>(`/organizations/${orgCd}`, data);
  return response.data;
};

/** 조직 비활성화 */
export const deactivateOrganization = async (orgCd: string, enterCd?: string): Promise<void> => {
  await api.delete(`/organizations/${orgCd}`, {
    params: { enterCd: enterCd || 'BS' },
  });
};
