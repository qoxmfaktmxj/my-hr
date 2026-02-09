package com.myhr.domain.auth;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * TSYS305 - USER관리 테이블 매핑 Entity
 * 로그인 인증에 사용
 */
@Entity
@Table(name = "TSYS305")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UserAccountId.class)
public class UserAccount {

    @Id
    @Column(name = "ENTER_CD", length = 10, nullable = false)
    private String enterCd;  // 회사구분

    @Id
    @Column(name = "SABUN", length = 13, nullable = false)
    private String sabun;  // 사원번호

    @Column(name = "ID", length = 100)
    private String id;  // 로그인 ID

    @Column(name = "PASSWORD", length = 100, nullable = false)
    private String password;  // 비밀번호 (BCrypt 해싱)

    @Column(name = "PASSWORDRMK", length = 4000)
    private String passwordRmk;  // 비밀번호 참고사항

    @Column(name = "ROCKING_YN", length = 1)
    @Builder.Default
    private String rockingYn = "N";  // 잠금여부 (Y/N)

    @Column(name = "LOGIN_FAIL_CNT")
    @Builder.Default
    private Integer loginFailCnt = 0;  // 로그인 실패 횟수

    @Column(name = "PSWD_CHG_YMD", length = 8)
    private String pswdChgYmd;  // 비밀번호 변경일자

    @Column(name = "SEARCH_TYPE", length = 1)
    @Builder.Default
    private String searchType = "P";  // 조회구분 (P/O/A)

    @Column(name = "EXTRA_YN", length = 1)
    @Builder.Default
    private String extraYn = "N";  // 외부사용자여부

    @Column(name = "MAINPAGE_TYPE", length = 1)
    private String mainpageType;  // 초기화면구분

    @Column(name = "SKIN_TYPE", length = 20)
    @Builder.Default
    private String skinType = "theme4";  // 스킨타입

    @Column(name = "FONT_TYPE", length = 20)
    @Builder.Default
    private String fontType = "nanum";  // 폰트

    @Column(name = "MAIN_TYPE", length = 20)
    @Builder.Default
    private String mainType = "M";  // 메뉴타입

    @Column(name = "CHKDATE")
    private LocalDateTime chkDate;  // 최종수정시간

    @Column(name = "CHKID", length = 100)
    private String chkId;  // 최종수정자

    @PrePersist
    @PreUpdate
    public void prePersist() {
        this.chkDate = LocalDateTime.now();
    }

    /**
     * 로그인 실패 횟수 증가
     */
    public void increaseLoginFailCnt() {
        this.loginFailCnt = (this.loginFailCnt == null ? 0 : this.loginFailCnt) + 1;
        // 5회 이상 실패 시 계정 잠금
        if (this.loginFailCnt >= 5) {
            this.rockingYn = "Y";
        }
    }

    /**
     * 로그인 성공 시 실패 횟수 초기화
     */
    public void resetLoginFailCnt() {
        this.loginFailCnt = 0;
    }

    /**
     * 계정 잠금 여부
     */
    public boolean isLocked() {
        return "Y".equals(this.rockingYn);
    }
}
