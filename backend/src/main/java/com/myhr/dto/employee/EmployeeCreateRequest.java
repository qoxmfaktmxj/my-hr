package com.myhr.dto.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeCreateRequest {

    @NotBlank(message = "회사코드는 필수입니다")
    private String enterCd;

    @NotBlank(message = "한글성명은 필수입니다")
    private String korNm;

    private String engNm;

    @Pattern(regexp = "^[MF]$", message = "성별은 M 또는 F입니다")
    private String sexType;

    @NotBlank(message = "입사일자는 필수입니다")
    @Pattern(regexp = "^\\d{8}$", message = "입사일자는 YYYYMMDD 형식입니다")
    private String empYmd;

    @Email(message = "이메일 형식이 올바르지 않습니다")
    private String email;

    @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "전화번호 형식이 올바르지 않습니다")
    private String hpNo;
}
