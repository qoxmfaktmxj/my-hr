package com.myhr.domain.system;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 공통코드 (TSYS005 - 세부코드관리)
 */
@Entity
@Table(name = "TSYS005")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(CommonCode.CommonCodeId.class)
public class CommonCode {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "GRCODE_CD", length = 10) private String grcodeCd;
    @Id @Column(name = "CODE", length = 10) private String code;

    @Column(name = "CODE_NM", length = 500) private String codeNm;
    @Column(name = "CODE_FULL_NM", length = 500) private String codeFullNm;
    @Column(name = "CODE_ENG_NM", length = 500) private String codeEngNm;
    @Column(name = "SEQ") private Integer seq;
    @Column(name = "VISUAL_YN", length = 1) private String visualYn;
    @Column(name = "USE_YN", length = 1) private String useYn;
    @Column(name = "NOTE1", length = 500) private String note1;
    @Column(name = "NOTE2", length = 500) private String note2;
    @Column(name = "NOTE3", length = 500) private String note3;
    @Column(name = "NOTE4", length = 500) private String note4;
    @Column(name = "NUM_NOTE") private Integer numNote;
    @Column(name = "MEMO", length = 4000) private String memo;
    @Column(name = "ERP_CODE", length = 10) private String erpCode;
    @Column(name = "LANGUAGE_CD", length = 120) private String languageCd;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class CommonCodeId implements Serializable {
        private String enterCd;
        private String grcodeCd;
        private String code;
    }
}
