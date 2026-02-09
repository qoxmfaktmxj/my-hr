package com.myhr.domain.personnel;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "THRM128")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(Award.AwardId.class)
public class Award {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "SABUN", length = 13) private String sabun;
    @Id @Column(name = "SEQ") private Long seq;

    @Column(name = "PRIZE_YMD", length = 8) private String prizeYmd;
    @Column(name = "PRIZE_CD", length = 10) private String prizeCd;
    @Column(name = "PRIZE_GRD_CD", length = 10) private String prizeGrdCd;
    @Column(name = "PRIZE_OFFICE_NM", length = 100) private String prizeOfficeNm;
    @Column(name = "PRIZE_NO", length = 50) private String prizeNo;
    @Column(name = "MEMO2", length = 4000) private String memo2;
    @Column(name = "NOTE", length = 2000) private String note;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class AwardId implements Serializable {
        private String enterCd;
        private String sabun;
        private Long seq;
    }
}
