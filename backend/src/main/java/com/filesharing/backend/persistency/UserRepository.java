package com.filesharing.backend.persistency;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.filesharing.backend.models.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    UserDetails findByUsername(String username);

    User findUserById(String id);
}
