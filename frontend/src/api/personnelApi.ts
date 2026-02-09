import api from './axios';

// ===== 타입 정의 =====

export interface Family {
  enterCd: string;
  sabun: string;
  famNm: string;
  famCd: string;
  sdate: string;
  edate?: string;
  famYmd?: string;
  sexType?: string;
  telNo?: string;
  officeNm?: string;
  workNm?: string;
  famYn?: string;
  note?: string;
}

export interface License {
  enterCd: string;
  sabun: string;
  seq?: number;
  licenseNm?: string;
  licenseGrade?: string;
  licenseNo?: string;
  licSYmd?: string;
  licEYmd?: string;
  officeCd?: string;
  licenseBigo?: string;
}

export interface Education {
  enterCd: string;
  sabun: string;
  seq?: number;
  acaSchNm?: string;
  acamajNm?: string;
  acaSYm?: string;
  acaEYm?: string;
  acaYn?: string;
  acaType?: string;
  note?: string;
}

export interface Military {
  enterCd: string;
  sabun: string;
  transferCd?: string;
  armyCd?: string;
  armyGradeCd?: string;
  armyNo?: string;
  armySYmd?: string;
  armyEYmd?: string;
  armyUnitNm?: string;
  dischargeCd?: string;
  armyMemo?: string;
}

export interface Contact {
  enterCd: string;
  sabun: string;
  contType: string;
  contAddress?: string;
}

export interface Award {
  enterCd: string;
  sabun: string;
  seq?: number;
  prizeYmd?: string;
  prizeCd?: string;
  prizeGrdCd?: string;
  prizeOfficeNm?: string;
  prizeNo?: string;
  memo2?: string;
  note?: string;
}

export interface Discipline {
  enterCd: string;
  sabun: string;
  seq?: number;
  punishYmd?: string;
  punishCd?: string;
  punishGb?: string;
  sdate?: string;
  edate?: string;
  punishMemo?: string;
  punishNo?: string;
  note?: string;
}

// ===== API 함수 =====

// 가족
export const getFamilies = async (sabun: string, enterCd = 'BS') =>
  (await api.get<Family[]>(`/personnel/${sabun}/family`, { params: { enterCd } })).data;
export const saveFamily = async (sabun: string, data: Partial<Family>) =>
  (await api.post<Family>(`/personnel/${sabun}/family`, data)).data;
export const deleteFamily = async (sabun: string, id: { enterCd: string; sabun: string; famNm: string; famCd: string; sdate: string }) =>
  (await api.delete(`/personnel/${sabun}/family`, { data: id })).data;

// 자격증
export const getLicenses = async (sabun: string, enterCd = 'BS') =>
  (await api.get<License[]>(`/personnel/${sabun}/license`, { params: { enterCd } })).data;
export const saveLicense = async (sabun: string, data: Partial<License>) =>
  (await api.post<License>(`/personnel/${sabun}/license`, data)).data;
export const deleteLicense = async (sabun: string, seq: number, enterCd = 'BS') =>
  (await api.delete(`/personnel/${sabun}/license/${seq}`, { params: { enterCd } })).data;

// 학력
export const getEducations = async (sabun: string, enterCd = 'BS') =>
  (await api.get<Education[]>(`/personnel/${sabun}/education`, { params: { enterCd } })).data;
export const saveEducation = async (sabun: string, data: Partial<Education>) =>
  (await api.post<Education>(`/personnel/${sabun}/education`, data)).data;
export const deleteEducation = async (sabun: string, seq: number, enterCd = 'BS') =>
  (await api.delete(`/personnel/${sabun}/education/${seq}`, { params: { enterCd } })).data;

// 병역
export const getMilitary = async (sabun: string, enterCd = 'BS') =>
  (await api.get<Military>(`/personnel/${sabun}/military`, { params: { enterCd } })).data;
export const saveMilitary = async (sabun: string, data: Partial<Military>) =>
  (await api.post<Military>(`/personnel/${sabun}/military`, data)).data;

// 연락처
export const getContacts = async (sabun: string, enterCd = 'BS') =>
  (await api.get<Contact[]>(`/personnel/${sabun}/contact`, { params: { enterCd } })).data;
export const saveContact = async (sabun: string, data: Partial<Contact>) =>
  (await api.post<Contact>(`/personnel/${sabun}/contact`, data)).data;
export const deleteContact = async (sabun: string, contType: string, enterCd = 'BS') =>
  (await api.delete(`/personnel/${sabun}/contact/${contType}`, { params: { enterCd } })).data;

// 포상
export const getAwards = async (sabun: string, enterCd = 'BS') =>
  (await api.get<Award[]>(`/personnel/${sabun}/award`, { params: { enterCd } })).data;
export const saveAward = async (sabun: string, data: Partial<Award>) =>
  (await api.post<Award>(`/personnel/${sabun}/award`, data)).data;
export const deleteAward = async (sabun: string, seq: number, enterCd = 'BS') =>
  (await api.delete(`/personnel/${sabun}/award/${seq}`, { params: { enterCd } })).data;

// 징계
export const getDisciplines = async (sabun: string, enterCd = 'BS') =>
  (await api.get<Discipline[]>(`/personnel/${sabun}/discipline`, { params: { enterCd } })).data;
export const saveDiscipline = async (sabun: string, data: Partial<Discipline>) =>
  (await api.post<Discipline>(`/personnel/${sabun}/discipline`, data)).data;
export const deleteDiscipline = async (sabun: string, seq: number, enterCd = 'BS') =>
  (await api.delete(`/personnel/${sabun}/discipline/${seq}`, { params: { enterCd } })).data;
