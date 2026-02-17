package com.myhr.domain.personnel;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "emp_military")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(Military.MilitaryId.class)
public class Military {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "SABUN", length = 13) private String sabun;

    @Column(name = "TRANSFER_CD", length = 10) private String transferCd;
    @Column(name = "ARMY_CD", length = 10) private String armyCd;
    @Column(name = "ARMY_GRADE_CD", length = 10) private String armyGradeCd;
    @Column(name = "ARMY_NO", length = 30) private String armyNo;
    @Column(name = "ARMY_S_YMD", length = 8) private String armySYmd;
    @Column(name = "ARMY_E_YMD", length = 8) private String armyEYmd;
    @Column(name = "ARMY_UNIT_NM", length = 100) private String armyUnitNm;
    @Column(name = "DISCHARGE_CD", length = 10) private String dischargeCd;
    @Column(name = "ARMY_MEMO", length = 2000) private String armyMemo;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class MilitaryId implements Serializable {
        private String enterCd;
        private String sabun;
    }
}
