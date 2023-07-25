package com.filesharing.backend.dto.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AuthLoginDTO {
    private String username;
    private String password;

    private AuthLoginDTO(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public static AuthLoginDTO from(String username, String password) {
        return new AuthLoginDTO(username, password);
    }

    public String validateFields() {
        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            return "Dados inválidos. Por favor, tente novamente.";
        }
        return null;
    }

}
