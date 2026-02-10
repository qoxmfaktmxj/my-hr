package com.myhr.service.system;

import com.myhr.domain.system.CommonCode;
import com.myhr.domain.system.CommonCodeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommonCodeService {

    private final CommonCodeRepository commonCodeRepository;

    /**
     * 전체 공통코드를 그룹별로 묶어서 반환 (프론트 캐싱용)
     * { "STATUS": [{code, codeNm, seq, note1}, ...], "SEX_TYPE": [...] }
     */
    public Map<String, List<Map<String, Object>>> getAllCodes(String enterCd) {
        List<CommonCode> allCodes = commonCodeRepository
                .findByEnterCdAndUseYnOrderByGrcodeCdAscSeqAsc(enterCd, "Y");

        return allCodes.stream()
                .collect(Collectors.groupingBy(
                        CommonCode::getGrcodeCd,
                        LinkedHashMap::new,
                        Collectors.mapping(this::toCodeMap, Collectors.toList())
                ));
    }

    /**
     * 특정 그룹 코드 조회
     */
    public List<Map<String, Object>> getCodesByGroup(String enterCd, String grcodeCd) {
        return commonCodeRepository
                .findByEnterCdAndGrcodeCdAndUseYnOrderBySeqAsc(enterCd, grcodeCd, "Y")
                .stream()
                .map(this::toCodeMap)
                .toList();
    }

    /**
     * 코드 저장 (등록/수정)
     */
    @Transactional
    public CommonCode saveCode(CommonCode code) {
        code.setChkDate(LocalDateTime.now());
        if (code.getUseYn() == null) code.setUseYn("Y");
        if (code.getVisualYn() == null) code.setVisualYn("Y");
        return commonCodeRepository.save(code);
    }

    /**
     * 코드 삭제
     */
    @Transactional
    public void deleteCode(CommonCode.CommonCodeId id) {
        commonCodeRepository.deleteById(id);
    }

    // ===== private =====

    private Map<String, Object> toCodeMap(CommonCode c) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("code", c.getCode());
        map.put("codeNm", c.getCodeNm());
        map.put("codeEngNm", c.getCodeEngNm());
        map.put("seq", c.getSeq());
        map.put("note1", c.getNote1());
        map.put("note2", c.getNote2());
        return map;
    }
}
