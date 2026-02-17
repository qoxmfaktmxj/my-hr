package com.myhr.domain.auth;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * emp_history - 인사이력(개인조직사항) 테이블 매핑 Entity
 * 현재 부서/직급/직위 정보 조회에 사용
 */
@Entity
@Table(name = "emp_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(PersonalHistoryId.class)
public class PersonalHistory {

    @Id
    @Column(name = "ENTER_CD", length = 10, nullable = false)
    private String enterCd;  // 회사구분

    @Id
    @Column(name = "SABUN", length = 13, nullable = false)
    private String sabun;  // 사원번호

    @Id
    @Column(name = "SDATE", length = 8, nullable = false)
    private String sdate;  // 시작일자

    @Column(name = "EDATE", length = 8)
    private String edate;  // 종료일자

    @Column(name = "ORG_CD", length = 10)
    private String orgCd;  // 조직코드

    @Column(name = "STATUS_CD", length = 10)
    private String statusCd;  // 재직상태코드

    @Column(name = "STATUS_NM", length = 100)
    private String statusNm;  // 재직상태명

    @Column(name = "JIKCHAK_CD", length = 10)
    private String jikchakCd;  // 직책코드

    @Column(name = "JIKCHAK_NM", length = 100)
    private String jikchakNm;  // 직책명

    @Column(name = "JIKWEE_CD", length = 10)
    private String jikweeCd;  // 직위코드

    @Column(name = "JIKWEE_NM", length = 100)
    private String jikweeNm;  // 직위명

    @Column(name = "JIKGUB_CD", length = 10)
    private String jikgubCd;  // 직급코드

    @Column(name = "JIKGUB_NM", length = 100)
    private String jikgubNm;  // 직급명

    @Column(name = "WORK_TYPE", length = 10)
    private String workType;  // 직군코드

    @Column(name = "WORK_TYPE_NM", length = 100)
    private String workTypeNm;  // 직군명

    @Column(name = "MANAGE_CD", length = 10)
    private String manageCd;  // 사원구분코드

    @Column(name = "MANAGE_NM", length = 100)
    private String manageNm;  // 사원구분명

    @Column(name = "PAY_TYPE", length = 10)
    private String payType;  // 급여유형코드

    @Column(name = "PAY_TYPE_NM", length = 100)
    private String payTypeNm;  // 급여유형명

    @Column(name = "LOCATION_CD", length = 10)
    private String locationCd;  // Location코드

    @Column(name = "LOCATION_NM", length = 100)
    private String locationNm;  // Location명

    @Column(name = "BUSINESS_PLACE_CD", length = 10)
    private String businessPlaceCd;  // 사업장코드

    @Column(name = "BUSINESS_PLACE_NM", length = 100)
    private String businessPlaceNm;  // 사업장명

    @Column(name = "MAIN_DEPT_YN", length = 1)
    @Builder.Default
    private String mainDeptYn = "N";  // 주부서여부

    @Column(name = "CHKDATE")
    private LocalDateTime chkDate;

    @Column(name = "CHKID", length = 13)
    private String chkId;
}
