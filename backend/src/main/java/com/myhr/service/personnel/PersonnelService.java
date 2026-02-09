package com.myhr.service.personnel;

import com.myhr.domain.personnel.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PersonnelService {

    private final FamilyRepository familyRepository;
    private final LicenseRepository licenseRepository;
    private final EducationRepository educationRepository;
    private final MilitaryRepository militaryRepository;
    private final ContactRepository contactRepository;
    private final AwardRepository awardRepository;
    private final DisciplineRepository disciplineRepository;

    // ===== 가족 (THRM111) =====
    public List<Family> getFamilies(String enterCd, String sabun) {
        return familyRepository.findByEnterCdAndSabun(enterCd, sabun);
    }

    @Transactional
    public Family saveFamily(Family family) {
        family.setChkDate(LocalDateTime.now());
        return familyRepository.save(family);
    }

    @Transactional
    public void deleteFamily(Family.FamilyId id) {
        familyRepository.deleteById(id);
    }

    // ===== 자격증 (THRM113) =====
    public List<License> getLicenses(String enterCd, String sabun) {
        return licenseRepository.findByEnterCdAndSabun(enterCd, sabun);
    }

    @Transactional
    public License saveLicense(License license) {
        if (license.getSeq() == null) {
            long maxSeq = licenseRepository.findByEnterCdAndSabun(license.getEnterCd(), license.getSabun())
                    .stream().mapToLong(License::getSeq).max().orElse(0);
            license.setSeq(maxSeq + 1);
        }
        license.setChkDate(LocalDateTime.now());
        return licenseRepository.save(license);
    }

    @Transactional
    public void deleteLicense(String enterCd, String sabun, Long seq) {
        licenseRepository.deleteById(new License.LicenseId(enterCd, sabun, seq));
    }

    // ===== 학력 (THRM115) =====
    public List<Education> getEducations(String enterCd, String sabun) {
        return educationRepository.findByEnterCdAndSabun(enterCd, sabun);
    }

    @Transactional
    public Education saveEducation(Education education) {
        if (education.getSeq() == null) {
            long maxSeq = educationRepository.findByEnterCdAndSabun(education.getEnterCd(), education.getSabun())
                    .stream().mapToLong(Education::getSeq).max().orElse(0);
            education.setSeq(maxSeq + 1);
        }
        education.setChkDate(LocalDateTime.now());
        return educationRepository.save(education);
    }

    @Transactional
    public void deleteEducation(String enterCd, String sabun, Long seq) {
        educationRepository.deleteById(new Education.EducationId(enterCd, sabun, seq));
    }

    // ===== 병역 (THRM121) =====
    public Military getMilitary(String enterCd, String sabun) {
        return militaryRepository.findByEnterCdAndSabun(enterCd, sabun).orElse(null);
    }

    @Transactional
    public Military saveMilitary(Military military) {
        military.setChkDate(LocalDateTime.now());
        return militaryRepository.save(military);
    }

    // ===== 연락처 (THRM124) =====
    public List<Contact> getContacts(String enterCd, String sabun) {
        return contactRepository.findByEnterCdAndSabun(enterCd, sabun);
    }

    @Transactional
    public Contact saveContact(Contact contact) {
        contact.setChkDate(LocalDateTime.now());
        return contactRepository.save(contact);
    }

    @Transactional
    public void deleteContact(String enterCd, String sabun, String contType) {
        contactRepository.deleteById(new Contact.ContactId(enterCd, sabun, contType));
    }

    // ===== 포상 (THRM128) =====
    public List<Award> getAwards(String enterCd, String sabun) {
        return awardRepository.findByEnterCdAndSabun(enterCd, sabun);
    }

    @Transactional
    public Award saveAward(Award award) {
        if (award.getSeq() == null) {
            long maxSeq = awardRepository.findByEnterCdAndSabun(award.getEnterCd(), award.getSabun())
                    .stream().mapToLong(Award::getSeq).max().orElse(0);
            award.setSeq(maxSeq + 1);
        }
        award.setChkDate(LocalDateTime.now());
        return awardRepository.save(award);
    }

    @Transactional
    public void deleteAward(String enterCd, String sabun, Long seq) {
        awardRepository.deleteById(new Award.AwardId(enterCd, sabun, seq));
    }

    // ===== 징계 (THRM129) =====
    public List<Discipline> getDisciplines(String enterCd, String sabun) {
        return disciplineRepository.findByEnterCdAndSabun(enterCd, sabun);
    }

    @Transactional
    public Discipline saveDiscipline(Discipline discipline) {
        if (discipline.getSeq() == null) {
            long maxSeq = disciplineRepository.findByEnterCdAndSabun(discipline.getEnterCd(), discipline.getSabun())
                    .stream().mapToLong(Discipline::getSeq).max().orElse(0);
            discipline.setSeq(maxSeq + 1);
        }
        discipline.setChkDate(LocalDateTime.now());
        return disciplineRepository.save(discipline);
    }

    @Transactional
    public void deleteDiscipline(String enterCd, String sabun, Long seq) {
        disciplineRepository.deleteById(new Discipline.DisciplineId(enterCd, sabun, seq));
    }
}
