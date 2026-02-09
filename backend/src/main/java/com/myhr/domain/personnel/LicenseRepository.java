package com.myhr.domain.personnel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LicenseRepository extends JpaRepository<License, License.LicenseId> {

    List<License> findByEnterCdAndSabun(String enterCd, String sabun);

    Optional<License> findByEnterCdAndSabunAndSeq(String enterCd, String sabun, Long seq);
}
