package com.myhr.repository;

import com.myhr.domain.auth.UserAccount;
import com.myhr.domain.auth.UserAccountId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * TSYS305 (USER관리) Repository
 */
@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, UserAccountId> {

    /**
     * 로그인 ID로 사용자 조회
     * 명시적 JPQL 사용 (JPA에서 'id' 프로퍼티가 PK와 혼동되는 것을 방지)
     */
    @Query("SELECT u FROM UserAccount u WHERE u.id = :loginId")
    Optional<UserAccount> findByLoginId(@Param("loginId") String loginId);

    /**
     * 회사코드 + 사번으로 조회
     */
    Optional<UserAccount> findByEnterCdAndSabun(String enterCd, String sabun);

    /**
     * 회사코드 + ID로 조회
     */
    @Query("SELECT u FROM UserAccount u WHERE u.enterCd = :enterCd AND u.id = :loginId")
    Optional<UserAccount> findByEnterCdAndLoginId(@Param("enterCd") String enterCd, @Param("loginId") String loginId);
}
