package com.myhr.service.organization;

import com.myhr.domain.organization.Organization;
import com.myhr.dto.organization.OrganizationCreateRequest;
import com.myhr.dto.organization.OrganizationDto;
import com.myhr.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 조직관리 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    private String getToday() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }

    /**
     * 현재 유효한 조직 목록 조회
     */
    public List<OrganizationDto> getActiveOrganizations(String enterCd) {
        List<Organization> organizations = organizationRepository
                .findActiveOrganizations(enterCd, getToday());
        return organizations.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 전체 조직 목록 조회 (사용여부 무관)
     */
    public List<OrganizationDto> getAllOrganizations(String enterCd) {
        List<Organization> organizations = organizationRepository
                .findAllOrganizations(enterCd, getToday());
        return organizations.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 조직 검색
     */
    public List<OrganizationDto> searchOrganizations(String enterCd, String keyword) {
        List<Organization> organizations;

        if (StringUtils.hasText(keyword)) {
            organizations = organizationRepository
                    .searchOrganizations(enterCd, keyword, getToday());
        } else {
            organizations = organizationRepository
                    .findActiveOrganizations(enterCd, getToday());
        }

        return organizations.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 조직 상세 조회
     */
    public OrganizationDto getOrganization(String enterCd, String orgCd) {
        Organization organization = organizationRepository
                .findCurrentOrganization(enterCd, orgCd, getToday())
                .orElseThrow(() -> new IllegalArgumentException("조직을 찾을 수 없습니다: " + orgCd));
        return toDto(organization);
    }

    /**
     * 조직 등록
     */
    @Transactional
    public OrganizationDto createOrganization(OrganizationCreateRequest request) {
        Organization organization = Organization.builder()
                .enterCd(request.getEnterCd())
                .orgCd(request.getOrgCd())
                .sdate(request.getSdate())
                .edate(request.getEdate() != null ? request.getEdate() : "99991231")
                .orgNm(request.getOrgNm())
                .orgFullNm(request.getOrgFullNm())
                .orgEngNm(request.getOrgEngNm())
                .orgType(request.getOrgType())
                .objectType(request.getObjectType())
                .telNo(request.getTelNo())
                .coTelNo(request.getCoTelNo())
                .mission(request.getMission())
                .visualYn(request.getVisualYn() != null ? request.getVisualYn() : "Y")
                .workAreaCd(request.getWorkAreaCd())
                .workAreaNm(request.getWorkAreaNm())
                .memo(request.getMemo())
                .chkId("SYSTEM")
                .build();

        Organization saved = organizationRepository.save(organization);
        log.info("조직 등록 완료: enterCd={}, orgCd={}, orgNm={}",
                saved.getEnterCd(), saved.getOrgCd(), saved.getOrgNm());
        return toDto(saved);
    }

    /**
     * 조직 수정
     */
    @Transactional
    public OrganizationDto updateOrganization(String enterCd, String orgCd, OrganizationCreateRequest request) {
        Organization organization = organizationRepository
                .findCurrentOrganization(enterCd, orgCd, getToday())
                .orElseThrow(() -> new IllegalArgumentException("조직을 찾을 수 없습니다: " + orgCd));

        organization.setOrgNm(request.getOrgNm());
        organization.setOrgFullNm(request.getOrgFullNm());
        organization.setOrgEngNm(request.getOrgEngNm());
        organization.setOrgType(request.getOrgType());
        organization.setObjectType(request.getObjectType());
        organization.setTelNo(request.getTelNo());
        organization.setCoTelNo(request.getCoTelNo());
        organization.setMission(request.getMission());
        organization.setVisualYn(request.getVisualYn());
        organization.setWorkAreaCd(request.getWorkAreaCd());
        organization.setWorkAreaNm(request.getWorkAreaNm());
        organization.setMemo(request.getMemo());

        log.info("조직 수정 완료: enterCd={}, orgCd={}", enterCd, orgCd);
        return toDto(organization);
    }

    /**
     * 조직 비활성화 (사용여부 N)
     */
    @Transactional
    public void deactivateOrganization(String enterCd, String orgCd) {
        Organization organization = organizationRepository
                .findCurrentOrganization(enterCd, orgCd, getToday())
                .orElseThrow(() -> new IllegalArgumentException("조직을 찾을 수 없습니다: " + orgCd));

        organization.setVisualYn("N");
        organization.setEdate(getToday());
        log.info("조직 비활성화: enterCd={}, orgCd={}", enterCd, orgCd);
    }

    /**
     * 조직유형 코드 → 이름 변환
     */
    private String getOrgTypeName(String orgType) {
        if (orgType == null) return null;
        return switch (orgType) {
            case "T001" -> "대표이사";
            case "T002" -> "본부";
            case "T003" -> "팀";
            case "T004" -> "파트";
            default -> orgType;
        };
    }

    /**
     * Entity → DTO 변환
     */
    private OrganizationDto toDto(Organization org) {
        return OrganizationDto.builder()
                .enterCd(org.getEnterCd())
                .orgCd(org.getOrgCd())
                .orgNm(org.getOrgNm())
                .orgFullNm(org.getOrgFullNm())
                .orgEngNm(org.getOrgEngNm())
                .orgType(org.getOrgType())
                .orgTypeNm(getOrgTypeName(org.getOrgType()))
                .objectType(org.getObjectType())
                .telNo(org.getTelNo())
                .coTelNo(org.getCoTelNo())
                .mission(org.getMission())
                .visualYn(org.getVisualYn())
                .sdate(org.getSdate())
                .edate(org.getEdate())
                .workAreaCd(org.getWorkAreaCd())
                .workAreaNm(org.getWorkAreaNm())
                .memo(org.getMemo())
                .build();
    }
}
