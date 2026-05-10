package com.smartresume.controller;

import com.smartresume.service.AiIntegrationService;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ai")
public class AiController {
  private final AiIntegrationService aiIntegrationService;

  public AiController(AiIntegrationService aiIntegrationService) {
    this.aiIntegrationService = aiIntegrationService;
  }

  @PostMapping("/analyze")
  public Map<String, Object> analyze(@RequestParam String role, @RequestParam(required = false) MultipartFile file) throws Exception {
    return aiIntegrationService.analyze(role, file);
  }

  @PostMapping("/roadmap")
  public Map<String, Object> roadmap(@RequestBody Map<String, Object> request) {
    return aiIntegrationService.roadmap(request);
  }

  @PostMapping("/suggestions")
  public Map<String, Object> suggestions(@RequestBody Map<String, Object> request) {
    return aiIntegrationService.suggestions(request);
  }
}

