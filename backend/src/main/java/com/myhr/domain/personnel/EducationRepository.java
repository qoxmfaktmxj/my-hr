package com.myhr.domain.personnel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EducationRepository extends JpaRepository<Education, Education.EducationId> {

    List<Education> findByEnterCdAndSabun(String enterCd, String sabun);

    Optional<Education> findByEnterCdAndSabunAndSeq(String enterCd, String sabun, Long seq);
}
