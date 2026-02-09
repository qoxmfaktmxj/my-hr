package com.myhr.domain.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

    // 회사코드로 사원 목록 조회
    List<Employee> findByEnterCd(String enterCd);

    // 재직상태로 조회
    List<Employee> findByStatusCd(String statusCd);

    // 이름으로 검색 (LIKE)
    List<Employee> findByKorNmContaining(String korNm);

    // 회사코드 + 재직상태로 조회
    List<Employee> findByEnterCdAndStatusCd(String enterCd, String statusCd);

    // 사번으로 조회 (회사코드 포함)
    Optional<Employee> findByEnterCdAndSabun(String enterCd, String sabun);

    // 입사일 범위로 조회
    @Query("SELECT e FROM Employee e WHERE e.enterCd = :enterCd AND e.empYmd BETWEEN :startDate AND :endDate")
    List<Employee> findByEmpYmdBetween(
        @Param("enterCd") String enterCd,
        @Param("startDate") String startDate,
        @Param("endDate") String endDate
    );

    // ========== 페이징 지원 메서드 ==========

    // 회사코드로 페이징 조회
    Page<Employee> findByEnterCd(String enterCd, Pageable pageable);

    // 회사코드 + 재직상태로 페이징 조회
    Page<Employee> findByEnterCdAndStatusCd(String enterCd, String statusCd, Pageable pageable);

    // 회사코드 + 검색어(이름 또는 사번)로 페이징 조회
    @Query("SELECT e FROM Employee e WHERE e.enterCd = :enterCd " +
           "AND (e.korNm LIKE %:keyword% OR e.sabun LIKE %:keyword%)")
    Page<Employee> findByEnterCdAndKeyword(
        @Param("enterCd") String enterCd,
        @Param("keyword") String keyword,
        Pageable pageable
    );

    // 회사코드 + 검색어 + 재직상태로 페이징 조회
    @Query("SELECT e FROM Employee e WHERE e.enterCd = :enterCd " +
           "AND (e.korNm LIKE %:keyword% OR e.sabun LIKE %:keyword%) " +
           "AND e.statusCd = :statusCd")
    Page<Employee> findByEnterCdAndKeywordAndStatusCd(
        @Param("enterCd") String enterCd,
        @Param("keyword") String keyword,
        @Param("statusCd") String statusCd,
        Pageable pageable
    );

    // 전체 사원 수 조회 (회사코드별)
    long countByEnterCd(String enterCd);

    // 재직상태별 사원 수 조회
    long countByEnterCdAndStatusCd(String enterCd, String statusCd);

    // 이번 달 입사자 수 조회
    @Query("SELECT COUNT(e) FROM Employee e WHERE e.enterCd = :enterCd AND e.empYmd BETWEEN :startDate AND :endDate")
    long countNewEmployeesThisMonth(
        @Param("enterCd") String enterCd,
        @Param("startDate") String startDate,
        @Param("endDate") String endDate
    );
}
