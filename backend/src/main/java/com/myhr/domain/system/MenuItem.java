package com.myhr.domain.system;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "sys_menu_item")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(MenuItem.MenuItemId.class)
public class MenuItem {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "MAIN_MENU_CD", length = 10) private String mainMenuCd;
    @Id @Column(name = "PRIOR_MENU_CD", length = 10) private String priorMenuCd;
    @Id @Column(name = "MENU_CD", length = 10) private String menuCd;
    @Id @Column(name = "MENU_SEQ") private Integer menuSeq;

    @Column(name = "MENU_NM", length = 100) private String menuNm;
    @Column(name = "TYPE", length = 1) private String type;
    @Column(name = "PRG_CD", length = 100) private String prgCd;
    @Column(name = "SEARCH_SEQ") private Integer searchSeq;
    @Column(name = "CNT") private Integer cnt;
    @Column(name = "SEQ", nullable = false) private Integer seq;
    @Column(name = "DATA_RW_TYPE", length = 1) private String dataRwType;
    @Column(name = "DATA_PRG_TYPE", length = 1) private String dataPrgType;
    @Column(name = "ICON_CLASS", length = 50) private String iconClass;
    @Column(name = "MOBILE_PRG_CD", length = 100) private String mobilePrgCd;
    @Column(name = "LANGUAGE_CD", length = 120) private String languageCd;
    @Column(name = "APPL_CD", length = 10) private String applCd;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class MenuItemId implements Serializable {
        private String enterCd;
        private String mainMenuCd;
        private String priorMenuCd;
        private String menuCd;
        private Integer menuSeq;
    }
}
