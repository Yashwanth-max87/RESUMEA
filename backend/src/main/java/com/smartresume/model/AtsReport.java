package com.smartresume.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "ats_reports")
public class AtsReport {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  @ManyToOne(optional = false)
  private User user;
  @ManyToOne
  private Resume resume;
  private String targetRole;
  private int atsScore;
  private int matchingPercentage;
  @Column(columnDefinition = "TEXT")
  private String reportJson;
  private Instant createdAt = Instant.now();
}

