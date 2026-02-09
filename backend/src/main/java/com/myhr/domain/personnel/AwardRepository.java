package com.myhr.domain.personnel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AwardRepository extends JpaRepository<Award, Award.AwardId> {

    List<Award> findByEnterCdAndSabun(String enterCd, String sabun);

    Optional<Award> findByEnterCdAndSabunAndSeq(String enterCd, String sabun, Long seq);
}
