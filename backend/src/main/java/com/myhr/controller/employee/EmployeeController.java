package com.myhr.controller.employee;

import com.myhr.dto.employee.EmployeeCreateRequest;
import com.myhr.dto.employee.EmployeeDto;
import com.myhr.service.employee.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Tag(name = "Employee", description = "사원 관리 API")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    @Operation(summary = "사원 목록 조회", description = "회사의 전체 사원 목록을 조회합니다")
    public ResponseEntity<List<EmployeeDto>> getEmployees(
            @RequestParam(defaultValue = "BS") String enterCd) {
        return ResponseEntity.ok(employeeService.getEmployees(enterCd));
    }

    @GetMapping("/{sabun}")
    @Operation(summary = "사원 상세 조회", description = "사번으로 사원 정보를 조회합니다")
    public ResponseEntity<EmployeeDto> getEmployee(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun) {
        return ResponseEntity.ok(employeeService.getEmployee(enterCd, sabun));
    }

    @PostMapping
    @Operation(summary = "사원 등록", description = "새로운 사원을 등록합니다")
    public ResponseEntity<EmployeeDto> createEmployee(
            @Valid @RequestBody EmployeeCreateRequest request) {
        return ResponseEntity.ok(employeeService.createEmployee(request));
    }

    @PutMapping("/{sabun}")
    @Operation(summary = "사원 수정", description = "사원 정보를 수정합니다")
    public ResponseEntity<EmployeeDto> updateEmployee(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun,
            @Valid @RequestBody EmployeeCreateRequest request) {
        return ResponseEntity.ok(employeeService.updateEmployee(enterCd, sabun, request));
    }

    @DeleteMapping("/{sabun}")
    @Operation(summary = "사원 퇴직 처리", description = "사원을 퇴직 처리합니다")
    public ResponseEntity<Void> retireEmployee(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun,
            @RequestParam String retYmd) {
        employeeService.retireEmployee(enterCd, sabun, retYmd);
        return ResponseEntity.ok().build();
    }
}
