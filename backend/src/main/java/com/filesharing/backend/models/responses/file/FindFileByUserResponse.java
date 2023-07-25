package com.filesharing.backend.models.responses.file;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindFileByUserResponse {
    private String fileId;
    private String fileName;
    private String sender;
    private LocalDate created_at;
}
