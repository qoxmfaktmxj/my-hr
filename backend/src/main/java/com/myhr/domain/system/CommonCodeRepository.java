package com.myhr.domain.system;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommonCodeRepository extends JpaRepository<CommonCode, CommonCode.CommonCodeId> {

    /** 전체 코드 조회 (사용 중인 것만, 그룹→순서 정렬) */
    List<CommonCode> findByEnterCdAndUseYnOrderByGrcodeCdAscSeqAsc(String enterCd, String useYn);

    /** 특정 그룹 코드 조회 */
    List<CommonCode> findByEnterCdAndGrcodeCdAndUseYnOrderBySeqAsc(String enterCd, String grcodeCd, String useYn);

    /** 특정 그룹 전체 조회 (관리용, 미사용 포함) */
    List<CommonCode> findByEnterCdAndGrcodeCdOrderBySeqAsc(String enterCd, String grcodeCd);
}
