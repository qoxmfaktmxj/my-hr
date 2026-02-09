package com.myhr.domain.personnel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Family.FamilyId> {

    List<Family> findByEnterCdAndSabun(String enterCd, String sabun);
}
