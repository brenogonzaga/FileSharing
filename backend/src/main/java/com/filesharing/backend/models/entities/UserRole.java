package com.filesharing.backend.models.entities;

public enum UserRole {
    USER("USER"), ADMIN("ADMIN");

    private final String role;

    UserRole(String value) {
        this.role = value;
    }

    public String getRole() {
        return role;
    }
}
