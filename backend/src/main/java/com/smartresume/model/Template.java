package com.smartresume.model;

import jakarta.persistence.*;

@Entity
@Table(name = "templates")
public class Template {
  @Id
  private String id;
  private String name;
  private String description;
  private boolean atsFriendly;
  private boolean premium;

  public Template() {}

  public Template(String id, String name, String description, boolean atsFriendly, boolean premium) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.atsFriendly = atsFriendly;
    this.premium = premium;
  }

  public String getId() { return id; }
  public String getName() { return name; }
  public String getDescription() { return description; }
  public boolean isAtsFriendly() { return atsFriendly; }
  public boolean isPremium() { return premium; }
}

