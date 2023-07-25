package com.filesharing.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.filesharing.backend.dto.auth.AuthCreateDTO;
import com.filesharing.backend.dto.auth.AuthLoginDTO;
import com.filesharing.backend.models.entities.User;
import com.filesharing.backend.services.AuthService;
import com.filesharing.backend.services.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody AuthCreateDTO data) {
        String validateDTO = data.validateFields();
        if (validateDTO != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(validateDTO);
        }
        try {
            User user = this.authService.register(data.getName(), data.getUsername(), data.getPassword());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário já existe.");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao criar usuário. Por favor, verifique os dados e tente novamente.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthLoginDTO data) {
        String validateDTO = data.validateFields();
        if (validateDTO != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(validateDTO);
        }
        try {
            var usernameAndPassword = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
            var auth = authenticationManager.authenticate(usernameAndPassword);
            User user = (User) auth.getPrincipal();
            String jwtToken = this.jwtService.generateToken(user.getId());
            return ResponseEntity.ok(jwtToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos.");
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<String> refresh(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            String jwtToken = this.jwtService.refreshToken(jwt);
            return ResponseEntity.ok(jwtToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido.");
        }
    }

}
