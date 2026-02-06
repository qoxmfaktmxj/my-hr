package com.myhr.dto.employee;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDto {

    private String sabun;       // 사번
    private String enterCd;     // 회사코드
    private String korNm;       // 한글성명
    private String engNm;       // 영문성명
    private String sexType;     // 성별
    private String empYmd;      // 입사일자
    private String retYmd;      // 퇴사일자
    private String email;       // 이메일
    private String hpNo;        // 휴대폰번호
    private String statusCd;    // 재직상태코드
    private String statusNm;    // 재직상태명

    // 추가 정보 (조인 데이터)
    private String deptCd;      // 부서코드
    private String deptNm;      // 부서명
    private String positionCd;  // 직책코드
    private String positionNm;  // 직책명
    private String rankCd;      // 직급코드
    private String rankNm;      // 직급명
}
