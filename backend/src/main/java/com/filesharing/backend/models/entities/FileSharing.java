package com.filesharing.backend.models.entities;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "file_sharing")
public class FileSharing {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private User sender;

    @ManyToOne(optional = true)
    @JoinColumn(nullable = true)
    private User receiver;

    @Column(nullable = false)
    @CreatedDate
    private LocalDate createdAt;

    // @Column(nullable = true)
    // private LocalDate dateToExpire;

    public FileSharing(String name, User sender) {
        this.name = name;
        this.sender = sender;
        this.receiver = null;
        this.createdAt = LocalDate.now();
    }

    public String getUserId() {
        return null;
    }
}
