package com.myhr.domain.personnel;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "emp_education")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(Education.EducationId.class)
public class Education {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "SABUN", length = 13) private String sabun;
    @Id @Column(name = "SEQ") private Long seq;

    @Column(name = "ACA_SCH_NM", length = 100) private String acaSchNm;
    @Column(name = "ACAMAJ_NM", length = 100) private String acamajNm;
    @Column(name = "ACA_S_YM", length = 8) private String acaSYm;
    @Column(name = "ACA_E_YM", length = 8) private String acaEYm;
    @Column(name = "ACA_YN", length = 10) private String acaYn;
    @Column(name = "ACA_TYPE", length = 1) private String acaType;
    @Column(name = "NOTE", length = 100) private String note;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class EducationId implements Serializable {
        private String enterCd;
        private String sabun;
        private Long seq;
    }
}
