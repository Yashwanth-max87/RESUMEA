package com.smartresume.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "skill_roadmaps")
public class SkillRoadmap {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  @ManyToOne(optional = false)
  private User user;
  private String targetRole;
  @Column(columnDefinition = "TEXT")
  private String missingSkillsJson;
  @Column(columnDefinition = "TEXT")
  private String roadmapJson;
  private Instant createdAt = Instant.now();
}

