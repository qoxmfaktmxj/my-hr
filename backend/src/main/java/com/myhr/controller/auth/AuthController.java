package com.myhr.controller.auth;

import com.myhr.dto.auth.*;
import com.myhr.service.auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

/**
 * 인증 API Controller
 * 로그인, 로그아웃, 토큰 갱신, 사용자 정보 조회
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "인증 API")
public class AuthController {

    private final AuthService authService;

    /**
     * 로그인
     * POST /api/auth/login
     */
    @PostMapping("/login")
    @Operation(summary = "로그인", description = "ID/PW로 로그인합니다. Access Token과 사용자 정보를 반환합니다.")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {

        try {
            LoginResponse loginResponse = authService.login(request, response);
            return ResponseEntity.ok(loginResponse);
        } catch (IllegalArgumentException e) {
            // 인증 실패 (아이디/비밀번호 불일치)
            return ResponseEntity.status(401).body(
                    LoginResponse.builder().message(e.getMessage()).build());
        } catch (IllegalStateException e) {
            // 계정 잠금
            return ResponseEntity.status(423).body(
                    LoginResponse.builder().message(e.getMessage()).build());
        }
    }

    /**
     * 로그아웃
     * POST /api/auth/logout
     */
    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "Refresh Token Cookie를 삭제합니다.")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok(Map.of("message", "로그아웃 되었습니다."));
    }

    /**
     * Access Token 갱신
     * POST /api/auth/refresh
     * Refresh Token은 Cookie에서 자동으로 가져옴
     */
    @PostMapping("/refresh")
    @Operation(summary = "토큰 갱신", description = "Refresh Token으로 새로운 Access Token을 발급합니다.")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {

        // Cookie에서 Refresh Token 추출
        String refreshToken = extractRefreshTokenFromCookie(request);

        if (refreshToken == null) {
            return ResponseEntity.status(401).body(
                    Map.of("message", "Refresh Token이 없습니다. 다시 로그인해주세요."));
        }

        try {
            TokenRefreshResponse tokenResponse = authService.refreshToken(refreshToken, response);
            return ResponseEntity.ok(tokenResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(
                    Map.of("message", e.getMessage()));
        }
    }

    /**
     * 현재 로그인된 사용자 정보 조회
     * GET /api/auth/me
     * (JWT 인증 필요)
     */
    @GetMapping("/me")
    @Operation(summary = "내 정보 조회", description = "현재 로그인된 사용자의 세션 정보를 조회합니다.")
    public ResponseEntity<?> getMyInfo(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(
                    Map.of("message", "인증이 필요합니다."));
        }

        // Principal = "enterCd:sabun"
        String principal = (String) authentication.getPrincipal();
        String[] parts = principal.split(":");
        String enterCd = parts[0];
        String sabun = parts[1];

        UserSessionDto userInfo = authService.getUserInfo(enterCd, sabun);
        return ResponseEntity.ok(userInfo);
    }

    // ========== Private Methods ==========

    /**
     * Cookie에서 Refresh Token 추출
     */
    private String extractRefreshTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        return Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
