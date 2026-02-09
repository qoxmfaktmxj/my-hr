import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deactivateOrganization,
} from '../api/organizationApi';
import type { OrganizationCreateRequest } from '../api/organizationApi';

const ORG_KEYS = {
  all: ['organizations'] as const,
  lists: () => [...ORG_KEYS.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...ORG_KEYS.lists(), params] as const,
  details: () => [...ORG_KEYS.all, 'detail'] as const,
  detail: (orgCd: string) => [...ORG_KEYS.details(), orgCd] as const,
};

/** 조직 목록 조회 */
export function useOrganizationList(params?: {
  enterCd?: string;
  keyword?: string;
  includeInactive?: boolean;
}) {
  return useQuery({
    queryKey: ORG_KEYS.list(params || {}),
    queryFn: () => getOrganizations(params),
  });
}

/** 조직 상세 조회 */
export function useOrganizationDetail(orgCd: string) {
  return useQuery({
    queryKey: ORG_KEYS.detail(orgCd),
    queryFn: () => getOrganization(orgCd),
    enabled: !!orgCd,
  });
}

/** 조직 등록 */
export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationCreateRequest) => createOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORG_KEYS.all });
      message.success('조직이 등록되었습니다.');
    },
    onError: () => {
      message.error('조직 등록에 실패했습니다.');
    },
  });
}

/** 조직 수정 */
export function useUpdateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orgCd, data }: { orgCd: string; data: OrganizationCreateRequest }) =>
      updateOrganization(orgCd, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORG_KEYS.all });
      message.success('조직 정보가 수정되었습니다.');
    },
    onError: () => {
      message.error('조직 수정에 실패했습니다.');
    },
  });
}

/** 조직 비활성화 */
export function useDeactivateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orgCd: string) => deactivateOrganization(orgCd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORG_KEYS.all });
      message.success('조직이 비활성화되었습니다.');
    },
    onError: () => {
      message.error('조직 비활성화에 실패했습니다.');
    },
  });
}
