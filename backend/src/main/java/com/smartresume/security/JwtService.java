package com.smartresume.security;

import com.smartresume.config.AppProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  private final AppProperties properties;

  public JwtService(AppProperties properties) {
    this.properties = properties;
  }

  public String createToken(String email, String role) {
    Instant now = Instant.now();
    return Jwts.builder()
        .subject(email)
        .claim("role", role)
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plusSeconds(properties.jwtExpirationMinutes() * 60)))
        .signWith(secretKey())
        .compact();
  }

  public String subject(String token) {
    return claims(token).getSubject();
  }

  private Claims claims(String token) {
    return Jwts.parser().verifyWith(secretKey()).build().parseSignedClaims(token).getPayload();
  }

  private SecretKey secretKey() {
    byte[] bytes = properties.jwtSecret().getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(bytes.length >= 32 ? bytes : (properties.jwtSecret() + "00000000000000000000000000000000").getBytes(StandardCharsets.UTF_8));
  }
}

