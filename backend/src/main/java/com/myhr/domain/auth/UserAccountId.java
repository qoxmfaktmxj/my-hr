package com.myhr.domain.auth;

import lombok.*;

import java.io.Serializable;

/**
 * TSYS305 복합키 (ENTER_CD + SABUN)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserAccountId implements Serializable {

    private String enterCd;
    private String sabun;
}
