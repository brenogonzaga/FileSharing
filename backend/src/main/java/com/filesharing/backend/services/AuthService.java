package com.filesharing.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.filesharing.backend.models.entities.User;
import com.filesharing.backend.persistency.UserRepository;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public User register(String name, String email, String password) {
        if (this.userRepository.findByUsername(email) != null) {
            return null;
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(password);
        User user = new User(name, email, encryptedPassword);
        return this.userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username);
    }

}