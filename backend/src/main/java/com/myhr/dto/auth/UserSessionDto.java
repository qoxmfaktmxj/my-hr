package com.myhr.dto.auth;

import lombok.*;

/**
 * 사용자 세션 정보 DTO
 * 로그인 후 프론트 Zustand Store에 저장될 정보
 *
 * TSYS305 (USER관리) + THRM100 (인사마스타) + THRM151 (인사이력) + TORG101 (조직) 을 조합
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSessionDto {

    // ========== TSYS305 (USER관리) ==========
    /** 회사구분 */
    private String enterCd;
    /** 사번 */
    private String sabun;
    /** 로그인 ID */
    private String id;
    /** 조회구분 (P: 개인, O: 조직, A: 전체) */
    private String searchType;
    /** 외부사용자여부 */
    private String extraYn;
    /** 메뉴타입 */
    private String mainType;
    /** 스킨타입 */
    private String skinType;
    /** 폰트타입 */
    private String fontType;

    // ========== THRM100 (인사마스타) ==========
    /** 성명 */
    private String name;
    /** 영문성명 */
    private String nameUs;
    /** 입사일 */
    private String empYmd;
    /** 성별 */
    private String sexType;

    // ========== THRM151 (인사이력) + TORG101 (조직) ==========
    /** 조직코드 (부서코드) */
    private String orgCd;
    /** 조직명 (부서명) - TORG101에서 조회 */
    private String orgNm;
    /** 직급코드 */
    private String jikgubCd;
    /** 직급명 */
    private String jikgubNm;
    /** 직위코드 */
    private String jikweeCd;
    /** 직위명 */
    private String jikweeNm;
    /** 직책코드 */
    private String jikchakCd;
    /** 직책명 */
    private String jikchakNm;
    /** 재직상태코드 */
    private String statusCd;
    /** 재직상태명 */
    private String statusNm;
    /** 사원구분코드 */
    private String manageCd;
    /** 사원구분명 */
    private String manageNm;
    /** 사업장코드 */
    private String businessPlaceCd;
    /** 사업장명 */
    private String businessPlaceNm;
}
