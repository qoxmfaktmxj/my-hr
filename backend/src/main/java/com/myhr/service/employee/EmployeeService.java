package com.myhr.service.employee;

import com.myhr.domain.employee.Employee;
import com.myhr.domain.employee.EmployeeRepository;
import com.myhr.dto.employee.EmployeeCreateRequest;
import com.myhr.dto.employee.EmployeeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    /**
     * 사원 목록 조회
     */
    public List<EmployeeDto> getEmployees(String enterCd) {
        List<Employee> employees = employeeRepository.findByEnterCd(enterCd);
        return employees.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
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
