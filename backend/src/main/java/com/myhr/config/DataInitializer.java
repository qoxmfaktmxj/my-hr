package com.myhr.config;

import com.myhr.domain.employee.Employee;
import com.myhr.domain.employee.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * 개발용 초기 데이터 생성
 */
@Component
@RequiredArgsConstructor
@Profile("!prod")
public class DataInitializer implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) {
        // 초기 데이터 생성
        createEmployee("EMP00001", "BS", "김철수", "Kim Chulsoo", "M", "20200315", "kim@company.com", "010-1234-5678", "10");
        createEmployee("EMP00002", "BS", "이영희", "Lee Younghee", "F", "20210701", "lee@company.com", "010-2345-6789", "10");
        createEmployee("EMP00003", "BS", "박민수", "Park Minsu", "M", "20230110", "park@company.com", "010-3456-7890", "10");
        createEmployee("EMP00004", "BS", "정수진", "Jung Sujin", "F", "20190520", "jung@company.com", "010-4567-8901", "20");
        createEmployee("EMP00005", "BS", "최동훈", "Choi Donghun", "M", "20240201", "choi@company.com", "010-5678-9012", "10");

        System.out.println("=== 초기 데이터 생성 완료 ===");
    }

    private void createEmployee(String sabun, String enterCd, String korNm, String engNm,
                                 String sexType, String empYmd, String email, String hpNo, String statusCd) {
        Employee employee = Employee.builder()
                .sabun(sabun)
                .enterCd(enterCd)
                .korNm(korNm)
                .engNm(engNm)
                .sexType(sexType)
                .empYmd(empYmd)
                .email(email)
                .hpNo(hpNo)
                .statusCd(statusCd)
                .chkId("SYSTEM")
                .build();

        employeeRepository.save(employee);
    }
}
