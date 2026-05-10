package com.smartresume.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.UUID;

public class AuthDtos {
  public record LoginRequest(@Email String email, @NotBlank String password) {}
  public record RegisterRequest(@NotBlank String name, @Email String email, @NotBlank String password) {}
  public record UserResponse(UUID id, String name, String email, String role) {}
  public record AuthResponse(String token, UserResponse user) {}
}

