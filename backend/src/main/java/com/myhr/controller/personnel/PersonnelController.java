package com.myhr.controller.personnel;

import com.myhr.domain.personnel.*;
import com.myhr.service.personnel.PersonnelService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personnel")
@RequiredArgsConstructor
@Tag(name = "Personnel", description = "인사기본 API")
public class PersonnelController {

    private final PersonnelService personnelService;

    // ===== 가족 (THRM111) =====
    @GetMapping("/{sabun}/family")
    public ResponseEntity<List<Family>> getFamilies(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun) {
        return ResponseEntity.ok(personnelService.getFamilies(enterCd, sabun));
    }

    @PostMapping("/{sabun}/family")
    public ResponseEntity<Family> saveFamily(@PathVariable String sabun, @RequestBody Family family) {
        family.setSabun(sabun);
        return ResponseEntity.ok(personnelService.saveFamily(family));
    }

    @DeleteMapping("/{sabun}/family")
    public ResponseEntity<Void> deleteFamily(@PathVariable String sabun, @RequestBody Family.FamilyId id) {
        personnelService.deleteFamily(id);
        return ResponseEntity.ok().build();
    }

    // ===== 자격증 (THRM113) =====
    @GetMapping("/{sabun}/license")
    public ResponseEntity<List<License>> getLicenses(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun) {
        return ResponseEntity.ok(personnelService.getLicenses(enterCd, sabun));
    }

    @PostMapping("/{sabun}/license")
    public ResponseEntity<License> saveLicense(@PathVariable String sabun, @RequestBody License license) {
        license.setSabun(sabun);
        return ResponseEntity.ok(personnelService.saveLicense(license));
    }

    @DeleteMapping("/{sabun}/license/{seq}")
    public ResponseEntity<Void> deleteLicense(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun, @PathVariable Long seq) {
        personnelService.deleteLicense(enterCd, sabun, seq);
        return ResponseEntity.ok().build();
    }

    // ===== 학력 (THRM115) =====
    @GetMapping("/{sabun}/education")
    public ResponseEntity<List<Education>> getEducations(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun) {
        return ResponseEntity.ok(personnelService.getEducations(enterCd, sabun));
    }

    @PostMapping("/{sabun}/education")
    public ResponseEntity<Education> saveEducation(@PathVariable String sabun, @RequestBody Education education) {
        education.setSabun(sabun);
        return ResponseEntity.ok(personnelService.saveEducation(education));
    }

    @DeleteMapping("/{sabun}/education/{seq}")
    public ResponseEntity<Void> deleteEducation(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun, @PathVariable Long seq) {
        personnelService.deleteEducation(enterCd, sabun, seq);
        return ResponseEntity.ok().build();
    }

    // ===== 병역 (THRM121) =====
    @GetMapping("/{sabun}/military")
    public ResponseEntity<Military> getMilitary(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun) {
        return ResponseEntity.ok(personnelService.getMilitary(enterCd, sabun));
    }

    @PostMapping("/{sabun}/military")
    public ResponseEntity<Military> saveMilitary(@PathVariable String sabun, @RequestBody Military military) {
        military.setSabun(sabun);
        return ResponseEntity.ok(personnelService.saveMilitary(military));
    }

    // ===== 연락처 (THRM124) =====
    @GetMapping("/{sabun}/contact")
    public ResponseEntity<List<Contact>> getContacts(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun) {
        return ResponseEntity.ok(personnelService.getContacts(enterCd, sabun));
    }

    @PostMapping("/{sabun}/contact")
    public ResponseEntity<Contact> saveContact(@PathVariable String sabun, @RequestBody Contact contact) {
        contact.setSabun(sabun);
        return ResponseEntity.ok(personnelService.saveContact(contact));
    }

    @DeleteMapping("/{sabun}/contact/{contType}")
    public ResponseEntity<Void> deleteContact(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun, @PathVariable String contType) {
        personnelService.deleteContact(enterCd, sabun, contType);
        return ResponseEntity.ok().build();
    }

    // ===== 포상 (THRM128) =====
    @GetMapping("/{sabun}/award")
    public ResponseEntity<List<Award>> getAwards(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun) {
        return ResponseEntity.ok(personnelService.getAwards(enterCd, sabun));
    }

    @PostMapping("/{sabun}/award")
    public ResponseEntity<Award> saveAward(@PathVariable String sabun, @RequestBody Award award) {
        award.setSabun(sabun);
        return ResponseEntity.ok(personnelService.saveAward(award));
    }

    @DeleteMapping("/{sabun}/award/{seq}")
    public ResponseEntity<Void> deleteAward(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun, @PathVariable Long seq) {
        personnelService.deleteAward(enterCd, sabun, seq);
        return ResponseEntity.ok().build();
    }

    // ===== 징계 (THRM129) =====
    @GetMapping("/{sabun}/discipline")
    public ResponseEntity<List<Discipline>> getDisciplines(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun) {
        return ResponseEntity.ok(personnelService.getDisciplines(enterCd, sabun));
    }

    @PostMapping("/{sabun}/discipline")
    public ResponseEntity<Discipline> saveDiscipline(@PathVariable String sabun, @RequestBody Discipline discipline) {
        discipline.setSabun(sabun);
        return ResponseEntity.ok(personnelService.saveDiscipline(discipline));
    }

    @DeleteMapping("/{sabun}/discipline/{seq}")
    public ResponseEntity<Void> deleteDiscipline(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String sabun, @PathVariable Long seq) {
        personnelService.deleteDiscipline(enterCd, sabun, seq);
        return ResponseEntity.ok().build();
    }
}
