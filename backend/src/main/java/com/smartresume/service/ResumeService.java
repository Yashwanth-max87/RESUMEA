package com.smartresume.service;

import com.smartresume.dto.ResumeDtos.ResumeRequest;
import com.smartresume.dto.ResumeDtos.ResumeResponse;
import com.smartresume.model.Resume;
import com.smartresume.model.User;
import com.smartresume.repository.ResumeRepository;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ResumeService {
  private final ResumeRepository resumeRepository;
  private final PasswordEncoder passwordEncoder;

  public ResumeService(ResumeRepository resumeRepository, PasswordEncoder passwordEncoder) {
    this.resumeRepository = resumeRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public List<ResumeResponse> list(User user) {
    return resumeRepository.findByUserOrderByUpdatedAtDesc(user).stream().map(this::toResponse).toList();
  }

  public ResumeResponse get(User user, UUID id) {
    Resume resume = resumeRepository.findById(id).filter(item -> item.getUser().getId().equals(user.getId())).orElseThrow();
    return toResponse(resume);
  }

  public ResumeResponse create(User user, ResumeRequest request) {
    Resume resume = new Resume();
    resume.setUser(user);
    apply(resume, request);
    resume.setShareSlug(slug(request.title()) + "-" + UUID.randomUUID().toString().substring(0, 8));
    return toResponse(resumeRepository.save(resume));
  }

  public ResumeResponse update(User user, UUID id, ResumeRequest request) {
    Resume resume = resumeRepository.findById(id).filter(item -> item.getUser().getId().equals(user.getId())).orElseThrow();
    apply(resume, request);
    return toResponse(resumeRepository.save(resume));
  }

  public void delete(User user, UUID id) {
    Resume resume = resumeRepository.findById(id).filter(item -> item.getUser().getId().equals(user.getId())).orElseThrow();
    resumeRepository.delete(resume);
  }

  public ResumeResponse publicResume(String slug) {
    return toResponse(resumeRepository.findByShareSlug(slug).orElseThrow());
  }

  private void apply(Resume resume, ResumeRequest request) {
    resume.setTitle(request.title() == null || request.title().isBlank() ? "Untitled resume" : request.title());
    resume.setTemplateId(request.templateId() == null ? "atlas" : request.templateId());
    resume.setContentJson(request.contentJson());
    resume.setPasswordProtected(request.passwordProtected());
    if (request.sharePassword() != null && !request.sharePassword().isBlank()) {
      resume.setSharePasswordHash(passwordEncoder.encode(request.sharePassword()));
    }
  }

  private ResumeResponse toResponse(Resume resume) {
    return new ResumeResponse(resume.getId(), resume.getTitle(), resume.getTemplateId(), resume.getShareSlug(), resume.isPasswordProtected(), resume.getContentJson(), resume.getUpdatedAt());
  }

  private String slug(String title) {
    return title == null ? "resume" : title.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
  }
}
