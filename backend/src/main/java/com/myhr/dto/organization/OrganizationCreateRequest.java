package com.myhr.dto.organization;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

/**
 * 조직 등록/수정 요청 DTO
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizationCreateRequest {

    @NotBlank(message = "회사코드는 필수입니다")
    private String enterCd;

    @NotBlank(message = "조직코드는 필수입니다")
    private String orgCd;

    @NotBlank(message = "조직명은 필수입니다")
    private String orgNm;

    private String orgFullNm;   // 조직FULL명
    private String orgEngNm;    // 영문 조직명
    private String orgType;     // 조직유형
    private String objectType;  // 조직구분 (D: 본부, T: 팀)
    private String telNo;       // 전화번호
    private String coTelNo;     // 내선번호
    private String mission;     // 조직목적

    @Pattern(regexp = "^[YN]$", message = "사용여부는 Y 또는 N입니다")
    private String visualYn;    // 사용여부

    @NotBlank(message = "시작일자는 필수입니다")
    @Pattern(regexp = "^\\d{8}$", message = "시작일자는 YYYYMMDD 형식입니다")
    private String sdate;

    private String edate;       // 종료일자
    private String workAreaCd;  // 근무지역코드
    private String workAreaNm;  // 근무지역명
    private String memo;        // 메모
}
