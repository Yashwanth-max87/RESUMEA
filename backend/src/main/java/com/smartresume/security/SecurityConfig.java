package com.smartresume.security;

import com.smartresume.config.AppProperties;
import com.smartresume.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {
  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter, ObjectProvider<ClientRegistrationRepository> clientRegistrations) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**", "/oauth2/**", "/login/oauth2/**", "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
            .requestMatchers("/api/ai/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/templates/**", "/api/share/**").permitAll()
            .anyRequest().authenticated())
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    if (clientRegistrations.getIfAvailable() != null) {
      http.oauth2Login(oauth -> oauth.defaultSuccessUrl("http://localhost:5173/dashboard", true));
    }

    return http.build();
  }

  @Bean
  UserDetailsService userDetailsService(UserRepository userRepository) {
    return email -> userRepository.findByEmail(email)
        .map(user -> org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPasswordHash())
            .roles(user.getRole())
            .build())
        .orElseThrow(() -> new UsernameNotFoundException(email));
  }

  @Bean
  DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setUserDetailsService(userDetailsService);
    provider.setPasswordEncoder(passwordEncoder);
    return provider;
  }

  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource(AppProperties properties) {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of(properties.corsOrigin(), "http://localhost:5173", "http://127.0.0.1:5173"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
