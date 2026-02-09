package com.myhr.dto.auth;

import lombok.*;

/**
 * 토큰 갱신 응답 DTO
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenRefreshResponse {

    private String accessToken;
    private String message;
}
