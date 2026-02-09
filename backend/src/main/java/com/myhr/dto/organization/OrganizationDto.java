package com.myhr.dto.organization;

import lombok.*;

/**
 * 조직 응답 DTO
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizationDto {

    private String enterCd;     // 회사코드
    private String orgCd;       // 조직코드
    private String orgNm;       // 조직명
    private String orgFullNm;   // 조직FULL명 (경로)
    private String orgEngNm;    // 영문 조직명
    private String orgType;     // 조직유형
    private String orgTypeNm;   // 조직유형명
    private String objectType;  // 조직구분 (D: 본부, T: 팀)
    private String telNo;       // 대표전화번호
    private String coTelNo;     // 내선번호
    private String mission;     // 조직목적
    private String visualYn;    // 사용여부
    private String sdate;       // 시작일자
    private String edate;       // 종료일자
    private String workAreaCd;  // 근무지역코드
    private String workAreaNm;  // 근무지역명
    private String memo;        // 메모

    // 소속 인원 수 (선택)
    private Long memberCount;
}
