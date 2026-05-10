package com.smartresume.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
    String jwtSecret,
    long jwtExpirationMinutes,
    String aiServiceUrl,
    String corsOrigin
) {
}

