package com.filesharing.backend.services;

import java.io.*;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.filesharing.backend.models.entities.FileSharing;
import com.filesharing.backend.models.entities.User;
import com.filesharing.backend.persistency.FileSharingRepository;
import com.filesharing.backend.persistency.UserRepository;

@Service
public class FileSharingService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileSharingRepository fileSharingRepository;

    private static final String UPLOAD_DIR = "uploads";

    public String saveFile(MultipartFile file, String userId) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);
        User user = this.userRepository.findUserById(userId);
        if (user == null) {
            return null;
        }
        FileSharing fileSharing = new FileSharing(fileName, user);
        FileSharing fileSaved = this.fileSharingRepository.save(fileSharing);
        return fileSaved.getId();

    }

    public FileSharing getFileById(String fileId) {
        Optional<FileSharing> fileSharing = this.fileSharingRepository.findById(fileId);
        if (fileSharing.isEmpty()) {
            return null;
        }
        return fileSharing.get();
    }

    public FileSharing shareFile(String fileId, String username) {
        Optional<FileSharing> fileSharing = this.fileSharingRepository.findById(fileId);
        if (fileSharing.isEmpty()) {
            return null;
        }
        UserDetails user = this.userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        fileSharing.get().setReceiver((User) user);
        this.fileSharingRepository.save(fileSharing.get());
        return fileSharing.get();
    }

    public ByteArrayResource getFile(String fileName) throws IOException {
        String outputPath = UPLOAD_DIR + File.separator + fileName;
        Path path = Paths.get(outputPath);
        return new ByteArrayResource(Files.readAllBytes(path));
    }

    public void deleteDecryptedFile(String fileName) throws IOException {
        String outputPath = UPLOAD_DIR + File.separator + fileName;
        Path path = Paths.get(outputPath);
        Files.delete(path);
    }

    public void deleteFile(String fileId, String userId) throws IOException {
        Optional<FileSharing> fileSharing = this.fileSharingRepository.findById(fileId);
        if (fileSharing.isEmpty()) {
            return;
        }
        User user = this.userRepository.findUserById(userId);
        if (user == null) {
            return;
        }
        if (!fileSharing.get().getSender().equals(user)) {
            return;
        }
        this.fileSharingRepository.deleteById(fileId);
        this.deleteEncryptedFile(fileId);
    }

    public List<FileSharing> getAllFilesBySender(String user_id) {
        User user = this.userRepository.findUserById(user_id);
        return user == null ? null : this.fileSharingRepository.findAllBySender(user);
    }

    public List<FileSharing> getAllFilesByReceiver(String user_id) {
        User user = this.userRepository.findUserById(user_id);
        return user == null ? null : this.fileSharingRepository.findAllByReceiver(user);
    }

    private void deleteEncryptedFile(String fileId) throws IOException {
        String outputPath = UPLOAD_DIR + File.separator + fileId;
        Path path = Paths.get(outputPath);
        Files.delete(path);
    }

}
