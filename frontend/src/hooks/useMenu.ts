import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import * as menuApi from '../api/menuApi';

const KEYS = {
  tree: ['menus', 'tree'] as const,
  mainMenus: ['menus', 'main'] as const,
  items: (mainMenuCd: string) => ['menus', 'items', mainMenuCd] as const,
};

// ===== 사이드바용 =====

export function useMenuTree() {
  return useQuery({
    queryKey: KEYS.tree,
    queryFn: () => menuApi.getMenuTree(),
    staleTime: 5 * 60 * 1000, // 5분 캐시
  });
}

// ===== 대메뉴 =====

export function useMainMenus() {
  return useQuery({
    queryKey: KEYS.mainMenus,
    queryFn: () => menuApi.getMainMenus(),
  });
}

export function useSaveMainMenu() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<menuApi.MainMenu>) => menuApi.saveMainMenu(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.mainMenus });
      qc.invalidateQueries({ queryKey: KEYS.tree });
      message.success('저장되었습니다.');
    },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}

export function useDeleteMainMenu() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (mainMenuCd: string) => menuApi.deleteMainMenu(mainMenuCd),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.mainMenus });
      qc.invalidateQueries({ queryKey: KEYS.tree });
      message.success('삭제되었습니다.');
    },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}

// ===== 서브메뉴 =====

export function useMenuItems(mainMenuCd: string) {
  return useQuery({
    queryKey: KEYS.items(mainMenuCd),
    queryFn: () => menuApi.getMenuItems(mainMenuCd),
    enabled: !!mainMenuCd,
  });
}

export function useSaveMenuItem(mainMenuCd: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<menuApi.MenuItem>) => menuApi.saveMenuItem(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.items(mainMenuCd) });
      qc.invalidateQueries({ queryKey: KEYS.tree });
      message.success('저장되었습니다.');
    },
    onError: () => message.error('저장에 실패했습니다.'),
  });
}

export function useDeleteMenuItem(mainMenuCd: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: Parameters<typeof menuApi.deleteMenuItem>[0]) => menuApi.deleteMenuItem(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.items(mainMenuCd) });
      qc.invalidateQueries({ queryKey: KEYS.tree });
      message.success('삭제되었습니다.');
    },
    onError: () => message.error('삭제에 실패했습니다.'),
  });
}
