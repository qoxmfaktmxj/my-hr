import api from './axios';

// ===== 타입 =====

export interface MenuTreeNode {
  key: string;
  label: string;
  icon?: string;
  seq?: number;
  children?: MenuTreeNode[];
}

export interface MainMenu {
  enterCd: string;
  mainMenuCd: string;
  mainMenuNm: string;
  seq: number;
  iconClass?: string;
  useYn: string;
}

export interface MenuItem {
  enterCd: string;
  mainMenuCd: string;
  priorMenuCd: string;
  menuCd: string;
  menuSeq: number;
  menuNm: string;
  type?: string;
  prgCd?: string;
  seq: number;
  iconClass?: string;
}

// ===== 사이드바용 =====

export const getMenuTree = async (enterCd = 'BS'): Promise<MenuTreeNode[]> =>
  (await api.get<MenuTreeNode[]>('/menus/tree', { params: { enterCd } })).data;

// ===== 대메뉴 관리 =====

export const getMainMenus = async (enterCd = 'BS'): Promise<MainMenu[]> =>
  (await api.get<MainMenu[]>('/menus/main', { params: { enterCd } })).data;

export const saveMainMenu = async (data: Partial<MainMenu>): Promise<MainMenu> =>
  (await api.post<MainMenu>('/menus/main', data)).data;

export const deleteMainMenu = async (mainMenuCd: string, enterCd = 'BS'): Promise<void> => {
  await api.delete(`/menus/main/${mainMenuCd}`, { params: { enterCd } });
};

// ===== 서브메뉴 관리 =====

export const getMenuItems = async (mainMenuCd: string, enterCd = 'BS'): Promise<MenuItem[]> =>
  (await api.get<MenuItem[]>(`/menus/main/${mainMenuCd}/items`, { params: { enterCd } })).data;

export const saveMenuItem = async (data: Partial<MenuItem>): Promise<MenuItem> =>
  (await api.post<MenuItem>('/menus/items', data)).data;

export const deleteMenuItem = async (id: {
  enterCd: string; mainMenuCd: string; priorMenuCd: string; menuCd: string; menuSeq: number;
}): Promise<void> => {
  await api.delete('/menus/items', { data: id });
};
