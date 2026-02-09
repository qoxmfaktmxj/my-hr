package com.myhr.domain.personnel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Discipline.DisciplineId> {

    List<Discipline> findByEnterCdAndSabun(String enterCd, String sabun);

    Optional<Discipline> findByEnterCdAndSabunAndSeq(String enterCd, String sabun, Long seq);
}
