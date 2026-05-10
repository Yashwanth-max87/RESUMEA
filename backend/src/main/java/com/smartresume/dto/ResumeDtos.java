package com.smartresume.dto;

import java.time.Instant;
import java.util.UUID;

public class ResumeDtos {
  public record ResumeRequest(String title, String templateId, String contentJson, boolean passwordProtected, String sharePassword) {}
  public record ResumeResponse(UUID id, String title, String templateId, String shareSlug, boolean passwordProtected, String contentJson, Instant updatedAt) {}
  public record DashboardStats(long resumeCount, int bestAtsScore, int averageAtsScore, long reportsGenerated) {}
  public record PdfRequest(String html, String fileName) {}
}

