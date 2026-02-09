package com.myhr.repository;

import com.myhr.domain.auth.PersonalHistory;
import com.myhr.domain.auth.PersonalHistoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * THRM151 (인사이력 - 개인조직사항) Repository
 */
@Repository
public interface PersonalHistoryRepository extends JpaRepository<PersonalHistory, PersonalHistoryId> {

    /**
     * 현재 유효한 인사이력 조회 (주부서 기준)
     * EDATE가 '99991231'이거나 현재 날짜 이후인 가장 최근 이력
     */
    @Query("SELECT ph FROM PersonalHistory ph " +
           "WHERE ph.enterCd = :enterCd " +
           "AND ph.sabun = :sabun " +
           "AND ph.mainDeptYn = 'Y' " +
           "AND ph.edate >= :today " +
           "ORDER BY ph.sdate DESC")
    Optional<PersonalHistory> findCurrentHistory(
            @Param("enterCd") String enterCd,
            @Param("sabun") String sabun,
            @Param("today") String today);

    /**
     * 현재 유효한 인사이력 조회 (주부서 무관, 최신 이력)
     */
    @Query("SELECT ph FROM PersonalHistory ph " +
           "WHERE ph.enterCd = :enterCd " +
           "AND ph.sabun = :sabun " +
           "AND ph.edate >= :today " +
           "ORDER BY ph.sdate DESC")
    Optional<PersonalHistory> findLatestHistory(
            @Param("enterCd") String enterCd,
            @Param("sabun") String sabun,
            @Param("today") String today);
}
