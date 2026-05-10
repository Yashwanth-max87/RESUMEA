package com.smartresume.controller;

import com.smartresume.dto.ResumeDtos.ResumeRequest;
import com.smartresume.dto.ResumeDtos.ResumeResponse;
import com.smartresume.service.CurrentUserService;
import com.smartresume.service.ResumeService;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
  private final ResumeService resumeService;
  private final CurrentUserService currentUserService;

  public ResumeController(ResumeService resumeService, CurrentUserService currentUserService) {
    this.resumeService = resumeService;
    this.currentUserService = currentUserService;
  }

  @GetMapping
  public List<ResumeResponse> list() {
    return resumeService.list(currentUserService.currentUser());
  }

  @GetMapping("/{id}")
  public ResumeResponse get(@PathVariable UUID id) {
    return resumeService.get(currentUserService.currentUser(), id);
  }

  @PostMapping
  public ResumeResponse create(@RequestBody ResumeRequest request) {
    return resumeService.create(currentUserService.currentUser(), request);
  }

  @PutMapping("/{id}")
  public ResumeResponse update(@PathVariable UUID id, @RequestBody ResumeRequest request) {
    return resumeService.update(currentUserService.currentUser(), id, request);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable UUID id) {
    resumeService.delete(currentUserService.currentUser(), id);
  }
}
