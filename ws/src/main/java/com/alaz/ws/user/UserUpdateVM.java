package com.alaz.ws.user;

import lombok.Data;

import javax.persistence.Lob;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class UserUpdateVM {

    private String oldPassword;

    @Size(min = 8, max = 64)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).*$", message = "must include 0-9, a-z and A-Z")
    private String newPassword;

    private String newImage;
}
