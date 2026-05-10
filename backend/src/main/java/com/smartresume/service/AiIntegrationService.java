package com.smartresume.service;

import com.smartresume.config.AppProperties;
import java.util.Map;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AiIntegrationService {
  private final RestTemplate restTemplate;
  private final AppProperties properties;

  public AiIntegrationService(RestTemplate restTemplate, AppProperties properties) {
    this.restTemplate = restTemplate;
    this.properties = properties;
  }

  public Map<String, Object> analyze(String role, MultipartFile file) throws Exception {
    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    body.add("role", role);
    if (file != null && !file.isEmpty()) {
      ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
        @Override
        public String getFilename() {
          return file.getOriginalFilename();
        }
      };
      body.add("file", resource);
    }
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);
    return restTemplate.postForObject(properties.aiServiceUrl() + "/analyze", new HttpEntity<>(body, headers), Map.class);
  }

  public Map<String, Object> roadmap(Map<String, Object> request) {
    return restTemplate.postForObject(properties.aiServiceUrl() + "/roadmap", request, Map.class);
  }

  public Map<String, Object> suggestions(Map<String, Object> request) {
    return restTemplate.postForObject(properties.aiServiceUrl() + "/suggestions", request, Map.class);
  }
}

