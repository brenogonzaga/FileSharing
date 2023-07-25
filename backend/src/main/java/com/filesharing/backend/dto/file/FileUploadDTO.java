package com.filesharing.backend.dto.file;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class FileUploadDTO {
    private MultipartFile file;
    private String password;

    private FileUploadDTO(MultipartFile file, String password) {
        this.file = file;
        this.password = password;
    }

    public static FileUploadDTO from(MultipartFile file, String password) {
        return new FileUploadDTO(file, password);
    }

    public String validateFields() {
        if (file == null || password == null || file.isEmpty() || password.isEmpty()) {
            return "Dados inválidos. Por favor, tente novamente.";
        }
        if (file.getSize() > 10000000) {
            return "O arquivo deve ter no máximo 10MB.";
        }
        return null;
    }

}
