package com.filesharing.backend.dto.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthCreateDTO {
    private String name;
    private String username;
    private String password;

    private AuthCreateDTO(String name, String username, String password) {
        this.setName(name);
        this.setUsername(username);
        this.setPassword(password);
    }

    public static AuthCreateDTO from(String name, String username, String password) {
        return new AuthCreateDTO(name, username, password);
    }

    public String validateFields() {
        if (name == null || username == null || password == null) {
            return "Dados inválidos. Por favor, tente novamente.";
        }
        if (name.isEmpty() || username.isEmpty() || password.isEmpty()) {
            return "Dados inválidos. Por favor, tente novamente.";
        }
        return null;
    }

}