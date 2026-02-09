package com.myhr.service.employee;

import com.myhr.domain.employee.Employee;
import com.myhr.domain.employee.EmployeeRepository;
import com.myhr.dto.employee.DashboardStatsDto;
import com.myhr.dto.employee.EmployeeCreateRequest;
import com.myhr.dto.employee.EmployeeDto;
import com.myhr.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final OrganizationRepository organizationRepository;

    /**
     * 사원 목록 조회 (List)
     */
    public List<EmployeeDto> getEmployees(String enterCd) {
        List<Employee> employees = employeeRepository.findByEnterCd(enterCd);
        return employees.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 사원 목록 조회 (페이징)
     */
    public Page<EmployeeDto> getEmployeesWithPaging(String enterCd, String keyword, String statusCd, Pageable pageable) {
        Page<Employee> employeePage;

        boolean hasKeyword = StringUtils.hasText(keyword);
        boolean hasStatus = StringUtils.hasText(statusCd);

        if (hasKeyword && hasStatus) {
            // 검색어 + 재직상태
            employeePage = employeeRepository.findByEnterCdAndKeywordAndStatusCd(enterCd, keyword, statusCd, pageable);
        } else if (hasKeyword) {
            // 검색어만
            employeePage = employeeRepository.findByEnterCdAndKeyword(enterCd, keyword, pageable);
        } else if (hasStatus) {
            // 재직상태만
            employeePage = employeeRepository.findByEnterCdAndStatusCd(enterCd, statusCd, pageable);
        } else {
            // 전체 조회
            employeePage = employeeRepository.findByEnterCd(enterCd, pageable);
        }

        return employeePage.map(this::toDto);
    }

    /**
     * 사원 상세 조회
     */
    public EmployeeDto getEmployee(String enterCd, String sabun) {
        Employee employee = employeeRepository.findByEnterCdAndSabun(enterCd, sabun)
                .orElseThrow(() -> new IllegalArgumentException("사원을 찾을 수 없습니다: " + sabun));
        return toDto(employee);
    }

    /**
     * 사원 등록
     */
    @Transactional
    public EmployeeDto createEmployee(EmployeeCreateRequest request) {
        // 사번 생성 (간단한 예시)
        String sabun = generateSabun(request.getEnterCd());

        Employee employee = Employee.builder()
                .sabun(sabun)
                .enterCd(request.getEnterCd())
                .korNm(request.getKorNm())
                .engNm(request.getEngNm())
                .sexType(request.getSexType())
                .empYmd(request.getEmpYmd())
                .email(request.getEmail())
                .hpNo(request.getHpNo())
                .statusCd("10")  // 재직
                .build();

        Employee saved = employeeRepository.save(employee);
        return toDto(saved);
    }

    /**
     * 사원 수정
     */
    @Transactional
    public EmployeeDto updateEmployee(String enterCd, String sabun, EmployeeCreateRequest request) {
        Employee employee = employeeRepository.findByEnterCdAndSabun(enterCd, sabun)
                .orElseThrow(() -> new IllegalArgumentException("사원을 찾을 수 없습니다: " + sabun));

        employee.setKorNm(request.getKorNm());
        employee.setEngNm(request.getEngNm());
        employee.setSexType(request.getSexType());
        employee.setEmail(request.getEmail());
        employee.setHpNo(request.getHpNo());

        return toDto(employee);
    }

    /**
     * 사원 퇴직 처리
     */
    @Transactional
    public void retireEmployee(String enterCd, String sabun, String retYmd) {
        Employee employee = employeeRepository.findByEnterCdAndSabun(enterCd, sabun)
                .orElseThrow(() -> new IllegalArgumentException("사원을 찾을 수 없습니다: " + sabun));

        employee.setStatusCd("30");  // 퇴직
        employee.setRetYmd(retYmd);
    }

    /**
     * 사원 수 조회
     */
    public long getEmployeeCount(String enterCd) {
        return employeeRepository.countByEnterCd(enterCd);
    }

    /**
     * 재직상태별 사원 수 조회
     */
    public long getEmployeeCountByStatus(String enterCd, String statusCd) {
        return employeeRepository.countByEnterCdAndStatusCd(enterCd, statusCd);
    }

    /**
     * 대시보드 통계 조회
     */
    public DashboardStatsDto getDashboardStats(String enterCd) {
        long total = employeeRepository.countByEnterCd(enterCd);
        long active = employeeRepository.countByEnterCdAndStatusCd(enterCd, "10");
        long leave = employeeRepository.countByEnterCdAndStatusCd(enterCd, "20");
        long retired = employeeRepository.countByEnterCdAndStatusCd(enterCd, "30");

        // 이번 달 입사자 수
        LocalDate now = LocalDate.now();
        String monthStart = now.withDayOfMonth(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String monthEnd = now.withDayOfMonth(now.lengthOfMonth()).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        long newThisMonth = employeeRepository.countNewEmployeesThisMonth(enterCd, monthStart, monthEnd);

        // 활성 부서 수
        String today = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        long departments = organizationRepository.findActiveOrganizations(enterCd, today).size();

        return DashboardStatsDto.builder()
                .totalEmployees(total)
                .activeEmployees(active)
                .leaveEmployees(leave)
                .retiredEmployees(retired)
                .newThisMonth(newThisMonth)
                .departments(departments)
                .build();
    }

    /**
     * 사번 생성 (간단한 예시)
     */
    private String generateSabun(String enterCd) {
        long count = employeeRepository.count() + 1;
        return String.format("EMP%05d", count);
    }

    /**
     * Entity -> DTO 변환
     */
    private EmployeeDto toDto(Employee employee) {
        return EmployeeDto.builder()
                .sabun(employee.getSabun())
                .enterCd(employee.getEnterCd())
                .korNm(employee.getKorNm())
                .engNm(employee.getEngNm())
                .sexType(employee.getSexType())
                .empYmd(employee.getEmpYmd())
                .retYmd(employee.getRetYmd())
                .email(employee.getEmail())
                .hpNo(employee.getHpNo())
                .statusCd(employee.getStatusCd())
                .statusNm(getStatusName(employee.getStatusCd()))
                .build();
    }

    /**
     * 재직상태코드 -> 재직상태명
     */
    private String getStatusName(String statusCd) {
        return switch (statusCd) {
            case "10" -> "재직";
            case "20" -> "휴직";
            case "30" -> "퇴직";
            default -> "기타";
        };
    }
}
