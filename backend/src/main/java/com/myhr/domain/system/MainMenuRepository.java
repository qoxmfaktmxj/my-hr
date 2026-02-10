package com.myhr.domain.system;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MainMenuRepository extends JpaRepository<MainMenu, MainMenu.MainMenuId> {
    List<MainMenu> findByEnterCdAndUseYnOrderBySeq(String enterCd, String useYn);
    List<MainMenu> findByEnterCdOrderBySeq(String enterCd);
}
