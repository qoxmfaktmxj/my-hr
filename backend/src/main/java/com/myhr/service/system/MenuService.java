package com.myhr.service.system;

import com.myhr.domain.system.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuService {

    private final MainMenuRepository mainMenuRepository;
    private final MenuItemRepository menuItemRepository;

    // ========== 사이드바용 메뉴 트리 ==========

    /**
     * 전체 메뉴 트리 조회 (사이드바 렌더링용)
     * 대메뉴(TSYS309) + 서브메뉴(TSYS303) 조합
     */
    public List<Map<String, Object>> getMenuTree(String enterCd) {
        List<MainMenu> mainMenus = mainMenuRepository.findByEnterCdAndUseYnOrderBySeq(enterCd, "Y");
        List<MenuItem> allItems = menuItemRepository.findByEnterCdOrderByMainMenuCdAscSeqAsc(enterCd);

        // 대메뉴별 서브메뉴 그루핑
        Map<String, List<MenuItem>> itemsByMain = allItems.stream()
                .collect(Collectors.groupingBy(MenuItem::getMainMenuCd, LinkedHashMap::new, Collectors.toList()));

        List<Map<String, Object>> tree = new ArrayList<>();
        for (MainMenu main : mainMenus) {
            Map<String, Object> node = new LinkedHashMap<>();
            node.put("key", main.getMainMenuCd());
            node.put("label", main.getMainMenuNm());
            node.put("icon", main.getIconClass());
            node.put("seq", main.getSeq());

            List<MenuItem> children = itemsByMain.getOrDefault(main.getMainMenuCd(), Collections.emptyList());
            if (children.isEmpty()) {
                // 서브메뉴 없으면 대메뉴 자체가 링크 (대시보드 등)
            } else if (children.size() == 1 && children.get(0).getPrgCd() != null) {
                // 서브메뉴가 1개이고 URL이 있으면 대메뉴 클릭 시 바로 이동 (children 생략)
                node.put("key", children.get(0).getPrgCd());
            } else {
                // 서브메뉴가 2개 이상이면 children 추가
                List<Map<String, Object>> childNodes = new ArrayList<>();
                for (MenuItem item : children) {
                    Map<String, Object> child = new LinkedHashMap<>();
                    child.put("key", item.getPrgCd() != null ? item.getPrgCd() : item.getMenuCd());
                    child.put("label", item.getMenuNm());
                    child.put("icon", item.getIconClass());
                    child.put("seq", item.getSeq());
                    childNodes.add(child);
                }
                node.put("children", childNodes);
            }

            tree.add(node);
        }
        return tree;
    }

    // ========== 대메뉴 CRUD ==========

    public List<MainMenu> getMainMenus(String enterCd) {
        return mainMenuRepository.findByEnterCdOrderBySeq(enterCd);
    }

    @Transactional
    public MainMenu saveMainMenu(MainMenu mainMenu) {
        mainMenu.setChkDate(LocalDateTime.now());
        if (mainMenu.getUseYn() == null) mainMenu.setUseYn("Y");
        return mainMenuRepository.save(mainMenu);
    }

    @Transactional
    public void deleteMainMenu(String enterCd, String mainMenuCd) {
        // 서브메뉴도 함께 삭제
        List<MenuItem> items = menuItemRepository.findByEnterCdAndMainMenuCdOrderBySeq(enterCd, mainMenuCd);
        menuItemRepository.deleteAll(items);
        mainMenuRepository.deleteById(new MainMenu.MainMenuId(enterCd, mainMenuCd));
    }

    // ========== 서브메뉴 CRUD ==========

    public List<MenuItem> getMenuItems(String enterCd, String mainMenuCd) {
        return menuItemRepository.findByEnterCdAndMainMenuCdOrderBySeq(enterCd, mainMenuCd);
    }

    @Transactional
    public MenuItem saveMenuItem(MenuItem item) {
        item.setChkDate(LocalDateTime.now());
        if (item.getType() == null) item.setType("P");
        if (item.getPriorMenuCd() == null) item.setPriorMenuCd(item.getMainMenuCd());
        if (item.getMenuSeq() == null) item.setMenuSeq(1);
        return menuItemRepository.save(item);
    }

    @Transactional
    public void deleteMenuItem(MenuItem.MenuItemId id) {
        menuItemRepository.deleteById(id);
    }
}
