package com.myhr.domain.personnel;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "emp_certificate")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(License.LicenseId.class)
public class License {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "SABUN", length = 13) private String sabun;
    @Id @Column(name = "SEQ") private Long seq;

    @Column(name = "LICENSE_GUBUN", length = 10) private String licenseGubun;
    @Column(name = "LICENSE_NM", length = 100) private String licenseNm;
    @Column(name = "LICENSE_GRADE", length = 100) private String licenseGrade;
    @Column(name = "LICENSE_NO", length = 100) private String licenseNo;
    @Column(name = "LIC_S_YMD", length = 8) private String licSYmd;
    @Column(name = "LIC_E_YMD", length = 8) private String licEYmd;
    @Column(name = "OFFICE_CD", length = 100) private String officeCd;
    @Column(name = "LICENSE_BIGO", length = 1000) private String licenseBigo;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class LicenseId implements Serializable {
        private String enterCd;
        private String sabun;
        private Long seq;
    }
}
