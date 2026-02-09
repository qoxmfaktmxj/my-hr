package com.myhr.dto.auth;

import lombok.*;

/**
 * 로그인 응답 DTO
 * Access Token + 사용자 세션 정보
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    /** Access Token (프론트에서 메모리에 저장) */
    private String accessToken;

    /** 사용자 세션 정보 */
    private UserSessionDto userInfo;

    /** 비밀번호 변경 필요 여부 */
    private boolean passwordChangeRequired;

    /** 메시지 */
    private String message;
}
