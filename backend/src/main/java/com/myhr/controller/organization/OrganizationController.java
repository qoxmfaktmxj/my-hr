package com.myhr.controller.organization;

import com.myhr.dto.organization.OrganizationCreateRequest;
import com.myhr.dto.organization.OrganizationDto;
import com.myhr.service.organization.OrganizationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 조직관리 API Controller
 */
@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
@Tag(name = "Organization", description = "조직관리 API")
public class OrganizationController {

    private final OrganizationService organizationService;

    /**
     * 현재 유효한 조직 목록 조회
     */
    @GetMapping
    @Operation(summary = "조직 목록 조회", description = "현재 유효한 조직 목록을 조회합니다")
    public ResponseEntity<List<OrganizationDto>> getOrganizations(
            @RequestParam(defaultValue = "BS") String enterCd,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "false") boolean includeInactive) {

        List<OrganizationDto> organizations;

        if (keyword != null && !keyword.isBlank()) {
            organizations = organizationService.searchOrganizations(enterCd, keyword);
        } else if (includeInactive) {
            organizations = organizationService.getAllOrganizations(enterCd);
        } else {
            organizations = organizationService.getActiveOrganizations(enterCd);
        }

        return ResponseEntity.ok(organizations);
    }

    /**
     * 조직 상세 조회
     */
    @GetMapping("/{orgCd}")
    @Operation(summary = "조직 상세 조회", description = "조직코드로 조직 정보를 조회합니다")
    public ResponseEntity<OrganizationDto> getOrganization(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String orgCd) {
        return ResponseEntity.ok(organizationService.getOrganization(enterCd, orgCd));
    }

    /**
     * 조직 등록
     */
    @PostMapping
    @Operation(summary = "조직 등록", description = "새로운 조직을 등록합니다")
    public ResponseEntity<OrganizationDto> createOrganization(
            @Valid @RequestBody OrganizationCreateRequest request) {
        return ResponseEntity.ok(organizationService.createOrganization(request));
    }

    /**
     * 조직 수정
     */
    @PutMapping("/{orgCd}")
    @Operation(summary = "조직 수정", description = "조직 정보를 수정합니다")
    public ResponseEntity<OrganizationDto> updateOrganization(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String orgCd,
            @Valid @RequestBody OrganizationCreateRequest request) {
        return ResponseEntity.ok(organizationService.updateOrganization(enterCd, orgCd, request));
    }

    /**
     * 조직 비활성화
     */
    @DeleteMapping("/{orgCd}")
    @Operation(summary = "조직 비활성화", description = "조직을 비활성화 처리합니다")
    public ResponseEntity<Void> deactivateOrganization(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String orgCd) {
        organizationService.deactivateOrganization(enterCd, orgCd);
        return ResponseEntity.ok().build();
    }
}
