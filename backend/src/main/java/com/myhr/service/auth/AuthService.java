package com.myhr.service.auth;

import com.myhr.config.jwt.JwtTokenProvider;
import com.myhr.domain.auth.PersonalHistory;
import com.myhr.domain.auth.UserAccount;
import com.myhr.domain.employee.Employee;
import com.myhr.domain.employee.EmployeeRepository;
import com.myhr.domain.organization.Organization;
import com.myhr.dto.auth.*;
import com.myhr.repository.OrganizationRepository;
import com.myhr.repository.PersonalHistoryRepository;
import com.myhr.repository.UserAccountRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * 인증 서비스
 * 로그인, 로그아웃, 토큰 갱신 등 인증 관련 비즈니스 로직
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final EmployeeRepository employeeRepository;
    private final PersonalHistoryRepository personalHistoryRepository;
    private final OrganizationRepository organizationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    /** 비밀번호 변경 주기 (일) */
    private static final int PASSWORD_CHANGE_DAYS = 90;

    /** 최대 로그인 실패 횟수 */
    private static final int MAX_LOGIN_FAIL_COUNT = 5;

    /**
     * 로그인 처리
     */
    @Transactional
    public LoginResponse login(LoginRequest request, HttpServletResponse response) {
        // 1. 사용자 조회 (TSYS305에서 ID로 조회)
        UserAccount userAccount = userAccountRepository.findByLoginId(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다."));

        // 2. 계정 잠금 확인
        if (userAccount.isLocked()) {
            throw new IllegalStateException(
                    "계정이 잠겨있습니다. 관리자에게 문의하세요. (로그인 실패 " + userAccount.getLoginFailCnt() + "회)");
        }

        // 3. 비밀번호 검증
        if (!passwordEncoder.matches(request.getPassword(), userAccount.getPassword())) {
            // 실패 횟수 증가
            userAccount.increaseLoginFailCnt();
            userAccountRepository.save(userAccount);

            int remaining = MAX_LOGIN_FAIL_COUNT - userAccount.getLoginFailCnt();
            if (remaining > 0) {
                throw new IllegalArgumentException(
                        "아이디 또는 비밀번호가 일치하지 않습니다. (남은 시도: " + remaining + "회)");
            } else {
                throw new IllegalStateException(
                        "로그인 실패 횟수 초과로 계정이 잠겼습니다. 관리자에게 문의하세요.");
            }
        }

        // 4. 로그인 성공 → 실패 횟수 초기화
        userAccount.resetLoginFailCnt();
        userAccountRepository.save(userAccount);

        // 5. 비밀번호 변경 필요 여부 확인
        boolean passwordChangeRequired = isPasswordChangeRequired(userAccount.getPswdChgYmd());

        // 6. JWT 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(
                userAccount.getEnterCd(), userAccount.getSabun(), userAccount.getId());
        String refreshToken = jwtTokenProvider.createRefreshToken(
                userAccount.getEnterCd(), userAccount.getSabun());

        // 7. Refresh Token을 HttpOnly Cookie로 설정
        setRefreshTokenCookie(response, refreshToken);

        // 8. 사용자 세션 정보 생성 (TSYS305 + THRM100 + THRM151)
        UserSessionDto userInfo = buildUserSession(userAccount);

        log.info("로그인 성공: enterCd={}, sabun={}, id={}",
                userAccount.getEnterCd(), userAccount.getSabun(), userAccount.getId());

        return LoginResponse.builder()
                .accessToken(accessToken)
                .userInfo(userInfo)
                .passwordChangeRequired(passwordChangeRequired)
                .message("로그인 성공")
                .build();
    }

    /**
     * Access Token 갱신 (Refresh Token 기반)
     */
    @Transactional
    public TokenRefreshResponse refreshToken(String refreshToken, HttpServletResponse response) {
        // Refresh Token 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new IllegalArgumentException("유효하지 않은 Refresh Token입니다. 다시 로그인해주세요.");
        }

        String enterCd = jwtTokenProvider.getEnterCd(refreshToken);
        String sabun = jwtTokenProvider.getSabun(refreshToken);

        // 사용자 존재 확인
        UserAccount userAccount = userAccountRepository.findByEnterCdAndSabun(enterCd, sabun)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 계정 잠금 확인
        if (userAccount.isLocked()) {
            throw new IllegalStateException("계정이 잠겨있습니다.");
        }

        // 새로운 Access Token 발급
        String newAccessToken = jwtTokenProvider.createAccessToken(
                enterCd, sabun, userAccount.getId());

        // 새로운 Refresh Token 발급 (Refresh Token Rotation)
        String newRefreshToken = jwtTokenProvider.createRefreshToken(enterCd, sabun);
        setRefreshTokenCookie(response, newRefreshToken);

        return TokenRefreshResponse.builder()
                .accessToken(newAccessToken)
                .message("토큰 갱신 성공")
                .build();
    }

    /**
     * 로그아웃 처리 (Refresh Token Cookie 삭제)
     */
    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);  // 운영: true (HTTPS)
        cookie.setPath("/");
        cookie.setMaxAge(0);  // 즉시 만료
        response.addCookie(cookie);

        log.info("로그아웃 처리 완료");
    }

    /**
     * 현재 로그인된 사용자 정보 조회
     */
    public UserSessionDto getUserInfo(String enterCd, String sabun) {
        UserAccount userAccount = userAccountRepository.findByEnterCdAndSabun(enterCd, sabun)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return buildUserSession(userAccount);
    }

    // ========== Private Methods ==========

    /**
     * 사용자 세션 정보 구성
     * TSYS305 + THRM100 + THRM151 데이터 조합
     */
    private UserSessionDto buildUserSession(UserAccount userAccount) {
        UserSessionDto.UserSessionDtoBuilder builder = UserSessionDto.builder()
                // TSYS305 정보
                .enterCd(userAccount.getEnterCd())
                .sabun(userAccount.getSabun())
                .id(userAccount.getId())
                .searchType(userAccount.getSearchType())
                .extraYn(userAccount.getExtraYn())
                .mainType(userAccount.getMainType())
                .skinType(userAccount.getSkinType())
                .fontType(userAccount.getFontType());

        // THRM100 (인사마스타) 정보 조회
        employeeRepository.findByEnterCdAndSabun(userAccount.getEnterCd(), userAccount.getSabun())
                .ifPresent(employee -> {
                    builder.name(employee.getKorNm())
                           .nameUs(employee.getEngNm())
                           .empYmd(employee.getEmpYmd())
                           .sexType(employee.getSexType());
                });

        // THRM151 (인사이력) 현재 유효 이력 조회
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        personalHistoryRepository.findCurrentHistory(
                userAccount.getEnterCd(), userAccount.getSabun(), today)
                .or(() -> personalHistoryRepository.findLatestHistory(
                        userAccount.getEnterCd(), userAccount.getSabun(), today))
                .ifPresent(history -> {
                    builder.orgCd(history.getOrgCd())
                           .jikgubCd(history.getJikgubCd())
                           .jikgubNm(history.getJikgubNm())
                           .jikweeCd(history.getJikweeCd())
                           .jikweeNm(history.getJikweeNm())
                           .jikchakCd(history.getJikchakCd())
                           .jikchakNm(history.getJikchakNm())
                           .statusCd(history.getStatusCd())
                           .statusNm(history.getStatusNm())
                           .manageCd(history.getManageCd())
                           .manageNm(history.getManageNm())
                           .businessPlaceCd(history.getBusinessPlaceCd())
                           .businessPlaceNm(history.getBusinessPlaceNm());

                    // TORG101에서 조직명(orgNm) 조회
                    if (history.getOrgCd() != null) {
                        organizationRepository.findCurrentOrganization(
                                userAccount.getEnterCd(), history.getOrgCd(), today)
                                .ifPresent(org -> builder.orgNm(org.getOrgNm()));
                    }
                });

        return builder.build();
    }

    /**
     * 비밀번호 변경 필요 여부 확인 (90일 초과)
     */
    private boolean isPasswordChangeRequired(String pswdChgYmd) {
        if (pswdChgYmd == null || pswdChgYmd.isEmpty()) {
            return true;  // 변경일자 없으면 변경 필요
        }

        try {
            LocalDate changeDate = LocalDate.parse(pswdChgYmd, DateTimeFormatter.ofPattern("yyyyMMdd"));
            long daysBetween = ChronoUnit.DAYS.between(changeDate, LocalDate.now());
            return daysBetween > PASSWORD_CHANGE_DAYS;
        } catch (Exception e) {
            log.warn("비밀번호 변경일자 파싱 실패: {}", pswdChgYmd);
            return true;
        }
    }

    /**
     * Refresh Token을 HttpOnly Cookie로 설정
     */
    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);     // JavaScript에서 접근 불가 (XSS 방어)
        cookie.setSecure(false);      // 개발: false, 운영: true (HTTPS만 전송)
        cookie.setPath("/");          // 모든 경로에서 전송
        cookie.setMaxAge((int) (jwtTokenProvider.getRefreshTokenExpiration() / 1000));  // 7일
        // SameSite=Lax는 Cookie 속성으로 직접 설정 (Servlet API에서 미지원)
        response.addCookie(cookie);

        // SameSite 속성 추가 (Header로 직접 설정)
        String cookieHeader = String.format(
                "refreshToken=%s; Path=/; Max-Age=%d; HttpOnly; SameSite=Lax",
                refreshToken,
                jwtTokenProvider.getRefreshTokenExpiration() / 1000
        );
        response.addHeader("Set-Cookie", cookieHeader);
    }
}
