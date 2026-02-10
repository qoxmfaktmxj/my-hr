import api from './axios';

// ===== 타입 =====

export interface CodeItem {
  code: string;
  codeNm: string;
  codeEngNm?: string;
  seq: number;
  note1?: string;  // Tag 색상 등
  note2?: string;
}

/** 전체 공통코드 (그룹별 Map) */
export type CodeMap = Record<string, CodeItem[]>;

// ===== API =====

/** 전체 공통코드 조회 (한번에 모두) */
export const getAllCodes = async (enterCd = 'BS'): Promise<CodeMap> =>
  (await api.get<CodeMap>('/codes', { params: { enterCd } })).data;

/** 특정 그룹 코드 조회 */
export const getCodesByGroup = async (grcodeCd: string, enterCd = 'BS'): Promise<CodeItem[]> =>
  (await api.get<CodeItem[]>(`/codes/${grcodeCd}`, { params: { enterCd } })).data;

/** 코드 저장 */
export const saveCode = async (data: {
  enterCd: string;
  grcodeCd: string;
  code: string;
  codeNm: string;
  seq: number;
  note1?: string;
  useYn?: string;
}): Promise<unknown> =>
  (await api.post('/codes', data)).data;

/** 코드 삭제 */
export const deleteCode = async (id: {
  enterCd: string;
  grcodeCd: string;
  code: string;
}): Promise<void> => {
  await api.delete('/codes', { data: id });
};
