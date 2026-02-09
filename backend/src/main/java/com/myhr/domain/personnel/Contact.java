package com.myhr.domain.personnel;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "THRM124")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@IdClass(Contact.ContactId.class)
public class Contact {

    @Id @Column(name = "ENTER_CD", length = 10) private String enterCd;
    @Id @Column(name = "SABUN", length = 13) private String sabun;
    @Id @Column(name = "CONT_TYPE", length = 10) private String contType;

    @Column(name = "CONT_ADDRESS", length = 200) private String contAddress;
    @Column(name = "CHKDATE") private LocalDateTime chkDate;
    @Column(name = "CHKID", length = 13) private String chkId;

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ContactId implements Serializable {
        private String enterCd;
        private String sabun;
        private String contType;
    }
}
