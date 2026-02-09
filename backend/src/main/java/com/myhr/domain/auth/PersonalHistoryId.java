package com.myhr.domain.auth;

import lombok.*;

import java.io.Serializable;

/**
 * THRM151 복합키 (ENTER_CD + SABUN + SDATE)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PersonalHistoryId implements Serializable {

    private String enterCd;
    private String sabun;
    private String sdate;
}
