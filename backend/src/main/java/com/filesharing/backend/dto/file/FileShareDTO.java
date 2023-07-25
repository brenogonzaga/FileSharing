package com.filesharing.backend.dto.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileShareDTO {
    private String fileId;
    private String username;

    public static FileShareDTO from(String fileId, String username) {
        return new FileShareDTO(fileId, username);
    }

    public String validaFields() {
        if (fileId == null || username == null || fileId.isEmpty() || username.isEmpty()) {
            return "Dados inválidos. Por favor, tente novamente.";
        }
        return null;
    }

}
