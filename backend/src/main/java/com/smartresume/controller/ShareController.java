package com.smartresume.controller;

import com.smartresume.dto.ResumeDtos.ResumeResponse;
import com.smartresume.service.ResumeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/share")
public class ShareController {
  private final ResumeService resumeService;

  public ShareController(ResumeService resumeService) {
    this.resumeService = resumeService;
  }

  @GetMapping("/{slug}")
  public ResumeResponse publicResume(@PathVariable String slug) {
    return resumeService.publicResume(slug);
  }
}

