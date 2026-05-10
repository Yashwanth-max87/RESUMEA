package com.smartresume.controller;

import com.smartresume.dto.ResumeDtos.DashboardStats;
import com.smartresume.service.CurrentUserService;
import com.smartresume.service.ResumeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
  private final ResumeService resumeService;
  private final CurrentUserService currentUserService;

  public DashboardController(ResumeService resumeService, CurrentUserService currentUserService) {
    this.resumeService = resumeService;
    this.currentUserService = currentUserService;
  }

  @GetMapping("/stats")
  public DashboardStats stats() {
    long count = resumeService.list(currentUserService.currentUser()).size();
    return new DashboardStats(count, 88, 81, 5);
  }
}

