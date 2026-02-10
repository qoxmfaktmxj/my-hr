import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import * as codeApi from '../api/codeApi';
import type { CodeMap, CodeItem } from '../api/codeApi';

const KEYS = {
  all: ['codes', 'all'] as const,
  group: (grcodeCd: string) => ['codes', 'group', grcodeCd] as const,
};

// ===== 전체 코드 조회 (30분 캐싱) =====

export function useAllCodes() {
  return useQuery({
    queryKey: KEYS.all,
    queryFn: () => codeApi.getAllCodes(),
    staleTime: 30 * 60 * 1000, // 30분
  });
}

// ===== 핵심: 유틸 함수를 반환하는 훅 =====

export function useCodeMap() {
  const { data: codeMap } = useAllCodes();

  return useMemo(() => {
    const map: CodeMap = codeMap || {};

    /** 코드명 조회: getCodeName('STATUS', '10') → '재직' */
    const getCodeName = (grcodeCd: string, code?: string | null): string => {
      if (!code) return '-';
      const items = map[grcodeCd];
      if (!items) return code;
      const found = items.find((c) => c.code === code);
      return found?.codeNm || code;
    };

    /** Select 옵션 목록: getCodeOptions('STATUS') → [{value:'10', label:'재직'}, ...] */
    const getCodeOptions = (grcodeCd: string): Array<{ value: string; label: string }> => {
      const items = map[grcodeCd];
      if (!items) return [];
      return items.map((c) => ({ value: c.code, label: c.codeNm }));
    };

    /** Tag 색상 조회: getCodeColor('STATUS', '10') → 'green' */
    const getCodeColor = (grcodeCd: string, code?: string | null): string | undefined => {
      if (!code) return undefined;
      const items = map[grcodeCd];
      if (!items) return undefined;
      const found = items.find((c) => c.code === code);
      return found?.note1 || undefined;
    };

    /** 특정 그룹 코드 목록 원본 */
    const getCodes = (grcodeCd: string): CodeItem[] => {
      return map[grcodeCd] || [];
    };

    return { getCodeName, getCodeOptions, getCodeColor, getCodes, isLoaded: !!codeMap };
  }, [codeMap]);
}

// ===== 특정 그룹 조회 (관리용) =====

export function useCodesByGroup(grcodeCd: string) {
  return useQuery({
    queryKey: KEYS.group(grcodeCd),
    queryFn: () => codeApi.getCodesByGroup(grcodeCd),
    enabled: !!grcodeCd,
  });
}

// ===== CRUD mutations =====

export function useSaveCode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof codeApi.saveCode>[0]) => codeApi.saveCode(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all });
      message.success('저장되었습니다.');
    },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}

export function useDeleteCode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: Parameters<typeof codeApi.deleteCode>[0]) => codeApi.deleteCode(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all });
      message.success('삭제되었습니다.');
    },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}
