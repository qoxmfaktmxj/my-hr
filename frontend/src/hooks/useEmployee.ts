import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  retireEmployee,
} from '../api/employeeApi';
import type { Employee, EmployeeSearchParams } from '../api/employeeApi';

const EMPLOYEE_KEYS = {
  all: ['employees'] as const,
  lists: () => [...EMPLOYEE_KEYS.all, 'list'] as const,
  list: (params: EmployeeSearchParams) => [...EMPLOYEE_KEYS.lists(), params] as const,
  details: () => [...EMPLOYEE_KEYS.all, 'detail'] as const,
  detail: (sabun: string) => [...EMPLOYEE_KEYS.details(), sabun] as const,
};

/** 사원 목록 조회 */
export function useEmployeeList(params: EmployeeSearchParams) {
  return useQuery({
    queryKey: EMPLOYEE_KEYS.list(params),
    queryFn: () => getEmployees(params),
  });
}

/** 사원 상세 조회 */
export function useEmployeeDetail(sabun: string) {
  return useQuery({
    queryKey: EMPLOYEE_KEYS.detail(sabun),
    queryFn: () => getEmployee(sabun),
    enabled: !!sabun,
  });
}

/** 사원 등록 */
export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (employee: Employee) => createEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.all });
      message.success('사원이 등록되었습니다.');
    },
    onError: () => {
      message.error('사원 등록에 실패했습니다.');
    },
  });
}

/** 사원 수정 */
export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sabun, data }: { sabun: string; data: Partial<Employee> }) =>
      updateEmployee(sabun, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.all });
      message.success('사원 정보가 수정되었습니다.');
    },
    onError: () => {
      message.error('사원 정보 수정에 실패했습니다.');
    },
  });
}

/** 사원 퇴직 처리 */
export function useRetireEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sabun, retYmd }: { sabun: string; retYmd?: string }) =>
      retireEmployee(sabun, retYmd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.all });
      message.success('퇴직 처리가 완료되었습니다.');
    },
    onError: () => {
      message.error('퇴직 처리에 실패했습니다.');
    },
  });
}
