package com.myhr.domain.personnel;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "THRM129")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(Discipline.DisciplineId.class)
public class Discipline {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "SABUN", length = 13) private String sabun;
    @Id @Column(name = "SEQ") private Long seq;

    @Column(name = "PUNISH_YMD", length = 8) private String punishYmd;
    @Column(name = "PUNISH_CD", length = 10) private String punishCd;
    @Column(name = "PUNISH_GB", length = 10) private String punishGb;
    @Column(name = "SDATE", length = 8) private String sdate;
    @Column(name = "EDATE", length = 8) private String edate;
    @Column(name = "PUNISH_MEMO", length = 1000) private String punishMemo;
    @Column(name = "PUNISH_NO", length = 50) private String punishNo;
    @Column(name = "NOTE", length = 2000) private String note;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class DisciplineId implements Serializable {
        private String enterCd;
        private String sabun;
        private Long seq;
    }
}
