package com.smartresume.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "resume_sections")
public class ResumeSection {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(optional = false)
  private Resume resume;

  @Column(nullable = false)
  private String sectionKey;

  @Column(nullable = false)
  private int sortOrder;

  @Column(columnDefinition = "TEXT")
  private String dataJson;

  public UUID getId() { return id; }
  public Resume getResume() { return resume; }
  public void setResume(Resume resume) { this.resume = resume; }
  public String getSectionKey() { return sectionKey; }
  public void setSectionKey(String sectionKey) { this.sectionKey = sectionKey; }
  public int getSortOrder() { return sortOrder; }
  public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
  public String getDataJson() { return dataJson; }
  public void setDataJson(String dataJson) { this.dataJson = dataJson; }
}

