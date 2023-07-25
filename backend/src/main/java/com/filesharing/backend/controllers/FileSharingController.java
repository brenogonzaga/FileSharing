package com.filesharing.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.filesharing.backend.dto.file.FileDownloadDTO;
import com.filesharing.backend.dto.file.FileShareDTO;
import com.filesharing.backend.dto.file.FileUploadDTO;
import com.filesharing.backend.models.entities.FileSharing;
import com.filesharing.backend.models.entities.User;
import com.filesharing.backend.models.responses.file.FindFileByUserResponse;
import com.filesharing.backend.services.AesCryptoService;
import com.filesharing.backend.services.FileSharingService;

@RestController
@RequestMapping("/api/file-sharing")
public class FileSharingController {

    @Autowired
    private AesCryptoService aesCryptoService;

    @Autowired
    private FileSharingService fileSharingService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @ModelAttribute FileUploadDTO data,
            @AuthenticationPrincipal UserDetails userDetails) {
        String validateDTO = data.validateFields();
        if (validateDTO != null) {
            return ResponseEntity.badRequest().body(validateDTO);
        }
        try {
            User user = (User) userDetails;
            String fileId = fileSharingService.saveFile(data.getFile(), user.getId());
            if (fileId == null) {
                return ResponseEntity.badRequest().body("O usuário não existe.");
            }
            aesCryptoService.encryptFile(data.getFile().getOriginalFilename(), fileId, data.getPassword());
            fileSharingService.deleteDecryptedFile(data.getFile().getOriginalFilename());
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body("Erro ao criptografar o arquivo.");
        }
        return ResponseEntity.ok().body("Arquivo foi criptografado com sucesso.");
    }

    @PostMapping("/download")
    public ResponseEntity<Object> downloadFile(@RequestBody FileDownloadDTO data) {
        String validateDTO = data.validateFields();
        if (validateDTO != null) {
            return ResponseEntity.badRequest().body(validateDTO);
        }
        try {
            FileSharing fileSharing = fileSharingService.getFileById(data.getFileId());
            if (fileSharing == null) {
                return ResponseEntity.badRequest().body("Arquivo não encontrado.");
            }
            aesCryptoService.decryptFile(fileSharing.getName(), fileSharing.getId(), data.getPassword());
            ByteArrayResource resource = fileSharingService.getFile(fileSharing.getName());
            fileSharingService.deleteDecryptedFile(fileSharing.getName());
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileSharing.getName() + "\"");
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(resource.contentLength())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Senha incorreta.");
        }
    }

    @PostMapping("/share")
    public ResponseEntity<String> shareFile(@RequestBody FileShareDTO data) {
        String validateDTO = data.validaFields();
        if (validateDTO != null) {
            return ResponseEntity.badRequest().body(validateDTO);
        }
        try {
            FileSharing fileSharing = fileSharingService.shareFile(data.getFileId(), data.getUsername());
            if (fileSharing == null) {
                return ResponseEntity.badRequest().body("Usuário não encontrado.");
            }
            return ResponseEntity.ok().body("Arquivo compartilhado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao compartilhar o arquivo.");
        }
    }

    @GetMapping("/find")
    public ResponseEntity<List<FindFileByUserResponse>> findFiles(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = (User) userDetails;
            List<FileSharing> filesByUser = fileSharingService.getAllFilesBySender(user.getId());
            List<FindFileByUserResponse> filesByUserDTO = filesByUser.stream()
                    .map(file -> new FindFileByUserResponse(file.getId(), file.getName(),
                            file.getSender().getUsername(), file.getCreatedAt()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(filesByUserDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/find-shared")
    public ResponseEntity<List<FindFileByUserResponse>> findSharedFiles(
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = (User) userDetails;
            List<FileSharing> filesByUser = fileSharingService.getAllFilesByReceiver(user.getId());
            List<FindFileByUserResponse> filesByUserDTO = filesByUser.stream()
                    .map(file -> new FindFileByUserResponse(file.getId(), file.getName(),
                            file.getSender().getUsername(), file.getCreatedAt()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(filesByUserDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<String> deleteFile(@PathVariable("fileId") String fileId,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = (User) userDetails;
            fileSharingService.deleteFile(fileId, user.getId());
            return ResponseEntity.ok().body("Arquivo deletado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao deletar o arquivo.");
        }
    }

}