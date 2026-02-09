package com.myhr.config;

import com.myhr.domain.auth.UserAccount;
import com.myhr.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 개발 환경 전용: data.sql 로드 후 BCrypt 비밀번호 재설정
 * data.sql에 BCrypt 해시를 직접 넣기 어려우므로,
 * 서버 기동 시 PasswordEncoder를 사용하여 올바른 해시로 업데이트
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class PasswordInitializer implements ApplicationRunner {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    /** 개발용 기본 비밀번호 */
    private static final String DEFAULT_PASSWORD = "password123";

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        List<UserAccount> accounts = userAccountRepository.findAll();
        if (accounts.isEmpty()) {
            log.info("TSYS305 계정이 없습니다. 비밀번호 초기화를 건너뜁니다.");
            return;
        }

        String encodedPassword = passwordEncoder.encode(DEFAULT_PASSWORD);

        for (UserAccount account : accounts) {
            account.setPassword(encodedPassword);
        }

        userAccountRepository.saveAll(accounts);
        log.info("=== 개발용 비밀번호 초기화 완료: {}개 계정 (password: {}) ===",
                accounts.size(), DEFAULT_PASSWORD);
    }
}
