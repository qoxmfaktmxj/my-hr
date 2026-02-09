package com.myhr.domain.personnel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MilitaryRepository extends JpaRepository<Military, Military.MilitaryId> {

    Optional<Military> findByEnterCdAndSabun(String enterCd, String sabun);
}
