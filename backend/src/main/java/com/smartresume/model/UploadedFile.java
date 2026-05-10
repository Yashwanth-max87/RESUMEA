package com.smartresume.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "uploaded_files")
public class UploadedFile {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  @ManyToOne(optional = false)
  private User user;
  private String originalName;
  private String contentType;
  private long sizeBytes;
  private String storagePath;
  private Instant uploadedAt = Instant.now();
}

