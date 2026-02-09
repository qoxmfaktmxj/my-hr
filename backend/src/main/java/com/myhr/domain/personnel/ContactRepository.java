package com.myhr.domain.personnel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Contact.ContactId> {

    List<Contact> findByEnterCdAndSabun(String enterCd, String sabun);
}
