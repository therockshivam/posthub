package com.posthub.dto.request.auth;

import com.posthub.dto.annotation.FieldMatch;
import com.posthub.dto.annotation.Password;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldMatch(first = "password", second = "passwordConfirm", message = "{password_mismatch}")
public class ResetPasswordRequest {
    @NotBlank(message = "{not_blank}")
    @Password(message = "{invalid_password}")
    @Schema(
        name = "password",
        description = "New password of the user",
        type = "String",
        requiredMode = Schema.RequiredMode.REQUIRED,
        example = "P@sswd123."
    )
    private String password;

    @NotBlank(message = "{not_blank}")
    @Schema(
        name = "passwordConfirm",
        description = "New password confirmation for the user",
        type = "String",
        requiredMode = Schema.RequiredMode.REQUIRED,
        example = "P@sswd123."
    )
    private String passwordConfirm;
}
