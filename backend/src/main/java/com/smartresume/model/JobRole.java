package com.smartresume.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "job_roles")
public class JobRole {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  @Column(nullable = false, unique = true)
  private String name;
  @Column(columnDefinition = "TEXT")
  private String requiredSkillsJson;
}

