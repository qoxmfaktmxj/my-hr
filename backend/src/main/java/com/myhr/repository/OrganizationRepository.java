package com.myhr.repository;

import com.myhr.domain.organization.Organization;
import com.myhr.domain.organization.OrganizationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * TORG101 (조직기본관리) Repository
 */
@Repository
public interface OrganizationRepository extends JpaRepository<Organization, OrganizationId> {

    /**
     * 현재 유효한 조직 목록 조회 (사용여부 Y, 종료일자 미도래)
     */
    @Query("SELECT o FROM Organization o " +
           "WHERE o.enterCd = :enterCd " +
           "AND o.visualYn = 'Y' " +
           "AND o.edate >= :today " +
           "ORDER BY o.orgCd ASC")
    List<Organization> findActiveOrganizations(
            @Param("enterCd") String enterCd,
            @Param("today") String today);

    /**
     * 조직코드로 현재 유효한 조직 조회
     */
    @Query("SELECT o FROM Organization o " +
           "WHERE o.enterCd = :enterCd " +
           "AND o.orgCd = :orgCd " +
           "AND o.edate >= :today " +
           "ORDER BY o.sdate DESC")
    Optional<Organization> findCurrentOrganization(
            @Param("enterCd") String enterCd,
            @Param("orgCd") String orgCd,
            @Param("today") String today);

    /**
     * 조직유형으로 조회 (본부/팀 등)
     */
    @Query("SELECT o FROM Organization o " +
           "WHERE o.enterCd = :enterCd " +
           "AND o.orgType = :orgType " +
           "AND o.visualYn = 'Y' " +
           "AND o.edate >= :today " +
           "ORDER BY o.orgCd ASC")
    List<Organization> findByOrgType(
            @Param("enterCd") String enterCd,
            @Param("orgType") String orgType,
            @Param("today") String today);

    /**
     * 조직명으로 검색
     */
    @Query("SELECT o FROM Organization o " +
           "WHERE o.enterCd = :enterCd " +
           "AND (o.orgNm LIKE %:keyword% OR o.orgCd LIKE %:keyword%) " +
           "AND o.visualYn = 'Y' " +
           "AND o.edate >= :today " +
           "ORDER BY o.orgCd ASC")
    List<Organization> searchOrganizations(
            @Param("enterCd") String enterCd,
            @Param("keyword") String keyword,
            @Param("today") String today);

    /**
     * 전체 조직 조회 (사용여부 무관 - 관리용)
     */
    @Query("SELECT o FROM Organization o " +
           "WHERE o.enterCd = :enterCd " +
           "AND o.edate >= :today " +
           "ORDER BY o.orgCd ASC")
    List<Organization> findAllOrganizations(
            @Param("enterCd") String enterCd,
            @Param("today") String today);
}
