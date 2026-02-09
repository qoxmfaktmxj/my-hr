package com.myhr.domain.personnel;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "THRM111")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(Family.FamilyId.class)
public class Family {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "SABUN", length = 13) private String sabun;
    @Id @Column(name = "FAM_NM", length = 100) private String famNm;
    @Id @Column(name = "FAM_CD", length = 10) private String famCd;
    @Id @Column(name = "SDATE", length = 8) private String sdate;

    @Column(name = "EDATE", length = 8) private String edate;
    @Column(name = "FAM_YMD", length = 8) private String famYmd;
    @Column(name = "SEX_TYPE", length = 1) private String sexType;
    @Column(name = "TEL_NO", length = 100) private String telNo;
    @Column(name = "OFFICE_NM", length = 100) private String officeNm;
    @Column(name = "WORK_NM", length = 100) private String workNm;
    @Column(name = "FAM_YN", length = 1) private String famYn;
    @Column(name = "NOTE", length = 100) private String note;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class FamilyId implements Serializable {
        private String enterCd;
        private String sabun;
        private String famNm;
        private String famCd;
        private String sdate;
    }
}
