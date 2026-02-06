package com.myhr.domain.employee;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "THRM100")  // EHR 테이블명 참조
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @Column(name = "SABUN", length = 13)
    private String sabun;  // 사번

    @Column(name = "ENTER_CD", length = 10)
    private String enterCd;  // 회사코드

    @Column(name = "KOR_NM", length = 100)
    private String korNm;  // 한글성명

    @Column(name = "ENG_NM", length = 100)
    private String engNm;  // 영문성명

    @Column(name = "RES_NO", length = 20)
    private String resNo;  // 주민등록번호

    @Column(name = "SEX_TYPE", length = 1)
    private String sexType;  // 성별 (M/F)

    @Column(name = "EMP_YMD", length = 8)
    private String empYmd;  // 입사일자

    @Column(name = "RET_YMD", length = 8)
    private String retYmd;  // 퇴사일자

    @Column(name = "EMAIL", length = 100)
    private String email;

    @Column(name = "HP_NO", length = 20)
    private String hpNo;  // 휴대폰번호

    @Column(name = "STATUS_CD", length = 10)
    private String statusCd;  // 재직상태 (10:재직, 20:휴직, 30:퇴직)

    @Column(name = "CHKDATE")
    private LocalDateTime chkDate;  // 수정일시

    @Column(name = "CHKID", length = 13)
    private String chkId;  // 수정자

    @PrePersist
    @PreUpdate
    public void prePersist() {
        this.chkDate = LocalDateTime.now();
    }
}
