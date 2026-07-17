package com.example.stack.controller;

import com.example.stack.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    // A hardcoded mock check for simplicity, or connect to your Database User Entity
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if ("admin".equals(username) && "admin123".equals(password)) {
            String token = jwtUtils.generateToken(username);
            return ResponseEntity.ok(Map.of("token", token, "username", username));
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }
}