package com.myhr.domain.system;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "sys_main_menu")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(MainMenu.MainMenuId.class)
public class MainMenu {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "MAIN_MENU_CD", length = 10) private String mainMenuCd;

    @Column(name = "MAIN_MENU_NM", length = 100) private String mainMenuNm;
    @Column(name = "SEQ") private Integer seq;
    @Column(name = "ICON_CLASS", length = 50) private String iconClass;
    @Column(name = "USE_YN", length = 1) private String useYn;
    @Column(name = "IMAGE_PATH", length = 100) private String imagePath;
    @Column(name = "LANGUAGE_CD", length = 120) private String languageCd;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class MainMenuId implements Serializable {
        private String enterCd;
        private String mainMenuCd;
    }
}
