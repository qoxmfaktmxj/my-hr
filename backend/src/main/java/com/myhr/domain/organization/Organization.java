package com.myhr.domain.organization;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * TORG101 - 조직기본관리 테이블 매핑 Entity
 */
@Entity
@Table(name = "TORG101")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(OrganizationId.class)
public class Organization {

    @Id
    @Column(name = "ENTER_CD", length = 10, nullable = false)
    private String enterCd;  // 회사구분코드

    @Id
    @Column(name = "ORG_CD", length = 10, nullable = false)
    private String orgCd;  // 조직코드

    @Id
    @Column(name = "SDATE", length = 8, nullable = false)
    private String sdate;  // 시작일자

    @Column(name = "EDATE", length = 8)
    private String edate;  // 종료일자

    @Column(name = "OBJECT_TYPE", length = 10)
    private String objectType;  // 조직구분 (D: 본부, T: 팀)

    @Column(name = "ORG_NM", length = 100)
    private String orgNm;  // 조직명

    @Column(name = "ORG_FULL_NM", length = 100)
    private String orgFullNm;  // 조직FULL명

    @Column(name = "ORG_ENG_NM", length = 100)
    private String orgEngNm;  // 영문 조직명

    @Column(name = "INOUT_TYPE", length = 10)
    private String inoutType;  // 내외구분

    @Column(name = "ORG_TYPE", length = 10)
    private String orgType;  // 조직유형

    @Column(name = "TEL_NO", length = 20)
    private String telNo;  // 대표전화번호

    @Column(name = "CO_TEL_NO", length = 20)
    private String coTelNo;  // 내선번호

    @Column(name = "MISSION", length = 1000)
    private String mission;  // 조직목적

    @Column(name = "LOCATION_CD", length = 10)
    private String locationCd;  // LOCATION코드

    @Column(name = "ROLE_MEMO", length = 2000)
    private String roleMemo;  // 조직ROLE

    @Column(name = "KEY_JOB_MEMO", length = 2000)
    private String keyJobMemo;  // 조직KEY JOB

    @Column(name = "VISUAL_YN", length = 1)
    @Builder.Default
    private String visualYn = "Y";  // 사용여부

    @Column(name = "MEMO", length = 4000)
    private String memo;  // 메모

    @Column(name = "WORK_AREA_CD", length = 100)
    private String workAreaCd;  // 실근무지역코드

    @Column(name = "WORK_AREA_NM", length = 100)
    private String workAreaNm;  // 실근무지역명

    @Column(name = "ORG_NM_CN", length = 100)
    private String orgNmCn;  // 한자 조직명

    @Column(name = "ORG_NM_US", length = 100)
    private String orgNmUs;  // 영문 조직명

    @Column(name = "ORG_NM_JP", length = 100)
    private String orgNmJp;  // 일어 조직명

    @Column(name = "CHKDATE")
    private LocalDateTime chkDate;

    @Column(name = "CHKID", length = 13)
    private String chkId;

    @PrePersist
    @PreUpdate
    public void prePersist() {
        this.chkDate = LocalDateTime.now();
    }

    /**
     * 현재 유효한 조직인지 확인
     */
    public boolean isActive() {
        return "Y".equals(this.visualYn);
    }
}
