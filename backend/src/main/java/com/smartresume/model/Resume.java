package com.smartresume.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "resumes")
public class Resume {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(optional = false)
  private User user;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String templateId = "atlas";

  @Column(nullable = false, unique = true)
  private String shareSlug;

  private boolean passwordProtected;
  private String sharePasswordHash;

  @Column(columnDefinition = "TEXT")
  private String contentJson;

  private Instant createdAt = Instant.now();
  private Instant updatedAt = Instant.now();

  @PreUpdate
  void onUpdate() {
    updatedAt = Instant.now();
  }

  public UUID getId() { return id; }
  public User getUser() { return user; }
  public void setUser(User user) { this.user = user; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getTemplateId() { return templateId; }
  public void setTemplateId(String templateId) { this.templateId = templateId; }
  public String getShareSlug() { return shareSlug; }
  public void setShareSlug(String shareSlug) { this.shareSlug = shareSlug; }
  public boolean isPasswordProtected() { return passwordProtected; }
  public void setPasswordProtected(boolean passwordProtected) { this.passwordProtected = passwordProtected; }
  public String getSharePasswordHash() { return sharePasswordHash; }
  public void setSharePasswordHash(String sharePasswordHash) { this.sharePasswordHash = sharePasswordHash; }
  public String getContentJson() { return contentJson; }
  public void setContentJson(String contentJson) { this.contentJson = contentJson; }
  public Instant getCreatedAt() { return createdAt; }
  public Instant getUpdatedAt() { return updatedAt; }
}

