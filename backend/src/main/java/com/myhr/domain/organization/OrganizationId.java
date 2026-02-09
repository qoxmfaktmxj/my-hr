package com.myhr.domain.organization;

import lombok.*;

import java.io.Serializable;

/**
 * TORG101 복합키 (ENTER_CD + ORG_CD + SDATE)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class OrganizationId implements Serializable {

    private String enterCd;
    private String orgCd;
    private String sdate;
}
