package com.myhr.domain.system;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, MenuItem.MenuItemId> {
    List<MenuItem> findByEnterCdAndMainMenuCdOrderBySeq(String enterCd, String mainMenuCd);
    List<MenuItem> findByEnterCdOrderByMainMenuCdAscSeqAsc(String enterCd);
}
