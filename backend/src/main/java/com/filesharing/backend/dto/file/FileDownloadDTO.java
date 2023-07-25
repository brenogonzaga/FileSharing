package com.filesharing.backend.dto.file;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FileDownloadDTO {
    private String fileId;
    private String password;

    private FileDownloadDTO(String fileId, String password) {
        this.setFileId(fileId);
        this.setPassword(password);
    }

    public static FileDownloadDTO from(String fileId, String password) {
        return new FileDownloadDTO(fileId, password);
    }

    public String validateFields() {
        if (fileId == null || password == null || fileId.isEmpty() || password.isEmpty()) {
            return "Dados inválidos. Por favor, tente novamente.";
        }
        return null;
    }

}
