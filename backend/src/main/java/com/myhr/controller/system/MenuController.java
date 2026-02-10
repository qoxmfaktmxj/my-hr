package com.myhr.controller.system;

import com.myhr.domain.system.*;
import com.myhr.service.system.MenuService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/menus")
@RequiredArgsConstructor
@Tag(name = "Menu", description = "메뉴관리 API")
public class MenuController {

    private final MenuService menuService;

    // ===== 사이드바용 메뉴 트리 =====
    @GetMapping("/tree")
    public ResponseEntity<List<Map<String, Object>>> getMenuTree(
            @RequestParam(defaultValue = "BS") String enterCd) {
        return ResponseEntity.ok(menuService.getMenuTree(enterCd));
    }

    // ===== 대메뉴 CRUD =====
    @GetMapping("/main")
    public ResponseEntity<List<MainMenu>> getMainMenus(
            @RequestParam(defaultValue = "BS") String enterCd) {
        return ResponseEntity.ok(menuService.getMainMenus(enterCd));
    }

    @PostMapping("/main")
    public ResponseEntity<MainMenu> saveMainMenu(@RequestBody MainMenu mainMenu) {
        return ResponseEntity.ok(menuService.saveMainMenu(mainMenu));
    }

    @DeleteMapping("/main/{mainMenuCd}")
    public ResponseEntity<Void> deleteMainMenu(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String mainMenuCd) {
        menuService.deleteMainMenu(enterCd, mainMenuCd);
        return ResponseEntity.ok().build();
    }

    // ===== 서브메뉴 CRUD =====
    @GetMapping("/main/{mainMenuCd}/items")
    public ResponseEntity<List<MenuItem>> getMenuItems(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String mainMenuCd) {
        return ResponseEntity.ok(menuService.getMenuItems(enterCd, mainMenuCd));
    }

    @PostMapping("/items")
    public ResponseEntity<MenuItem> saveMenuItem(@RequestBody MenuItem item) {
        return ResponseEntity.ok(menuService.saveMenuItem(item));
    }

    @DeleteMapping("/items")
    public ResponseEntity<Void> deleteMenuItem(@RequestBody MenuItem.MenuItemId id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.ok().build();
    }
}
