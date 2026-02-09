package com.myhr.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * JWT 인증 필터
 * 모든 요청에서 Authorization 헤더의 Bearer 토큰을 검증
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = resolveToken(request);

        if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
            String enterCd = jwtTokenProvider.getEnterCd(token);
            String sabun = jwtTokenProvider.getSabun(token);
            String id = jwtTokenProvider.getId(token);

            // 인증 객체 생성 (Principal = "enterCd:sabun", Credentials = id)
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            enterCd + ":" + sabun,  // principal
                            id,                      // credentials
                            List.of(new SimpleGrantedAuthority("ROLE_USER"))
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug("JWT 인증 성공: enterCd={}, sabun={}", enterCd, sabun);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Request Header에서 Bearer 토큰 추출
     */
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * 인증이 필요없는 경로는 필터 Skip
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // /api/auth/me는 인증이 필요하므로 필터를 적용해야 함
        if (path.equals("/api/auth/me")) {
            return false;
        }
        return path.startsWith("/api/auth/")
                || path.startsWith("/h2-console")
                || path.startsWith("/api-docs")
                || path.startsWith("/swagger-ui");
    }
}
