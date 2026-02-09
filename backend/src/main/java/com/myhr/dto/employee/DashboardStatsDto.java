package com.myhr.dto.employee;

import lombok.*;

/**
 * 대시보드 통계 DTO
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDto {

    private long totalEmployees;    // 전체 사원 수
    private long activeEmployees;   // 재직 중
    private long leaveEmployees;    // 휴직 중
    private long retiredEmployees;  // 퇴직
    private long newThisMonth;      // 이번 달 입사
    private long departments;       // 부서 수 (사용 중인)
}
