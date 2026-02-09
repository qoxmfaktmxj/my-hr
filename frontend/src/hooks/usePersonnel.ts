import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import * as personnelApi from '../api/personnelApi';

const KEYS = {
  family: (sabun: string) => ['personnel', sabun, 'family'] as const,
  license: (sabun: string) => ['personnel', sabun, 'license'] as const,
  education: (sabun: string) => ['personnel', sabun, 'education'] as const,
  military: (sabun: string) => ['personnel', sabun, 'military'] as const,
  contact: (sabun: string) => ['personnel', sabun, 'contact'] as const,
  award: (sabun: string) => ['personnel', sabun, 'award'] as const,
  discipline: (sabun: string) => ['personnel', sabun, 'discipline'] as const,
};

// ===== 가족 =====
export function useFamilies(sabun: string) {
  return useQuery({ queryKey: KEYS.family(sabun), queryFn: () => personnelApi.getFamilies(sabun), enabled: !!sabun });
}
export function useSaveFamily(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<personnelApi.Family>) => personnelApi.saveFamily(sabun, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.family(sabun) }); message.success('저장되었습니다.'); },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}
export function useDeleteFamily(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: { enterCd: string; sabun: string; famNm: string; famCd: string; sdate: string }) => personnelApi.deleteFamily(sabun, id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.family(sabun) }); message.success('삭제되었습니다.'); },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}

// ===== 자격증 =====
export function useLicenses(sabun: string) {
  return useQuery({ queryKey: KEYS.license(sabun), queryFn: () => personnelApi.getLicenses(sabun), enabled: !!sabun });
}
export function useSaveLicense(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<personnelApi.License>) => personnelApi.saveLicense(sabun, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.license(sabun) }); message.success('저장되었습니다.'); },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}
export function useDeleteLicense(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (seq: number) => personnelApi.deleteLicense(sabun, seq),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.license(sabun) }); message.success('삭제되었습니다.'); },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}

// ===== 학력 =====
export function useEducations(sabun: string) {
  return useQuery({ queryKey: KEYS.education(sabun), queryFn: () => personnelApi.getEducations(sabun), enabled: !!sabun });
}
export function useSaveEducation(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<personnelApi.Education>) => personnelApi.saveEducation(sabun, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.education(sabun) }); message.success('저장되었습니다.'); },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}
export function useDeleteEducation(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (seq: number) => personnelApi.deleteEducation(sabun, seq),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.education(sabun) }); message.success('삭제되었습니다.'); },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}

// ===== 병역 =====
export function useMilitary(sabun: string) {
  return useQuery({ queryKey: KEYS.military(sabun), queryFn: () => personnelApi.getMilitary(sabun), enabled: !!sabun });
}
export function useSaveMilitary(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<personnelApi.Military>) => personnelApi.saveMilitary(sabun, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.military(sabun) }); message.success('저장되었습니다.'); },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}

// ===== 연락처 =====
export function useContacts(sabun: string) {
  return useQuery({ queryKey: KEYS.contact(sabun), queryFn: () => personnelApi.getContacts(sabun), enabled: !!sabun });
}
export function useSaveContact(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<personnelApi.Contact>) => personnelApi.saveContact(sabun, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.contact(sabun) }); message.success('저장되었습니다.'); },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}
export function useDeleteContact(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (contType: string) => personnelApi.deleteContact(sabun, contType),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.contact(sabun) }); message.success('삭제되었습니다.'); },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}

// ===== 포상 =====
export function useAwards(sabun: string) {
  return useQuery({ queryKey: KEYS.award(sabun), queryFn: () => personnelApi.getAwards(sabun), enabled: !!sabun });
}
export function useSaveAward(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<personnelApi.Award>) => personnelApi.saveAward(sabun, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.award(sabun) }); message.success('저장되었습니다.'); },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}
export function useDeleteAward(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (seq: number) => personnelApi.deleteAward(sabun, seq),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.award(sabun) }); message.success('삭제되었습니다.'); },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}

// ===== 징계 =====
export function useDisciplines(sabun: string) {
  return useQuery({ queryKey: KEYS.discipline(sabun), queryFn: () => personnelApi.getDisciplines(sabun), enabled: !!sabun });
}
export function useSaveDiscipline(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<personnelApi.Discipline>) => personnelApi.saveDiscipline(sabun, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.discipline(sabun) }); message.success('저장되었습니다.'); },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}
export function useDeleteDiscipline(sabun: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (seq: number) => personnelApi.deleteDiscipline(sabun, seq),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEYS.discipline(sabun) }); message.success('삭제되었습니다.'); },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}
