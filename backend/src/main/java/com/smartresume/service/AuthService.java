package com.smartresume.service;

import com.smartresume.dto.AuthDtos.AuthResponse;
import com.smartresume.dto.AuthDtos.LoginRequest;
import com.smartresume.dto.AuthDtos.RegisterRequest;
import com.smartresume.dto.AuthDtos.UserResponse;
import com.smartresume.model.User;
import com.smartresume.repository.UserRepository;
import com.smartresume.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
  }

  public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByEmail(request.email())) {
      throw new IllegalArgumentException("Email already registered");
    }
    User user = new User();
    user.setName(request.name());
    user.setEmail(request.email());
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user = userRepository.save(user);
    return response(user);
  }

  public AuthResponse login(LoginRequest request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    return response(userRepository.findByEmail(request.email()).orElseThrow());
  }

  private AuthResponse response(User user) {
    String token = jwtService.createToken(user.getEmail(), user.getRole());
    return new AuthResponse(token, new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole()));
  }
}

