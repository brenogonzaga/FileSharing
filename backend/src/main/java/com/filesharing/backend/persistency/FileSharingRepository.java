package com.filesharing.backend.persistency;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.filesharing.backend.models.entities.FileSharing;
import com.filesharing.backend.models.entities.User;

public interface FileSharingRepository extends JpaRepository<FileSharing, String> {
    List<FileSharing> findAllBySender(User sender);

    List<FileSharing> findAllByReceiver(User receiver);
}
