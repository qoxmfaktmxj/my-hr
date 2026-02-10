package com.myhr.controller.system;

import com.myhr.domain.system.CommonCode;
import com.myhr.service.system.CommonCodeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/codes")
@RequiredArgsConstructor
@Tag(name = "CommonCode", description = "공통코드 API")
public class CommonCodeController {

    private final CommonCodeService commonCodeService;

    /**
     * 전체 공통코드 조회 (그룹별 Map)
     * 프론트에서 한번에 가져와 캐싱
     */
    @GetMapping
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getAllCodes(
            @RequestParam(defaultValue = "BS") String enterCd) {
        return ResponseEntity.ok(commonCodeService.getAllCodes(enterCd));
    }

    /**
     * 특정 그룹 코드 조회
     */
    @GetMapping("/{grcodeCd}")
    public ResponseEntity<List<Map<String, Object>>> getCodesByGroup(
            @RequestParam(defaultValue = "BS") String enterCd,
            @PathVariable String grcodeCd) {
        return ResponseEntity.ok(commonCodeService.getCodesByGroup(enterCd, grcodeCd));
    }

    /**
     * 코드 저장 (등록/수정)
     */
    @PostMapping
    public ResponseEntity<CommonCode> saveCode(@RequestBody CommonCode code) {
        return ResponseEntity.ok(commonCodeService.saveCode(code));
    }

    /**
     * 코드 삭제
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteCode(@RequestBody CommonCode.CommonCodeId id) {
        commonCodeService.deleteCode(id);
        return ResponseEntity.ok().build();
    }
}
