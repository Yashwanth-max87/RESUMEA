package com.smartresume.service;

import com.smartresume.model.Template;
import com.smartresume.repository.TemplateRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TemplateSeeder implements CommandLineRunner {
  private final TemplateRepository templateRepository;

  public TemplateSeeder(TemplateRepository templateRepository) {
    this.templateRepository = templateRepository;
  }

  @Override
  public void run(String... args) {
    if (templateRepository.count() > 0) return;
    templateRepository.save(new Template("atlas", "Atlas", "Modern two-column technical layout.", true, false));
    templateRepository.save(new Template("signal", "Signal", "Elegant single-column ATS layout.", true, false));
    templateRepository.save(new Template("executive", "Executive", "Premium senior profile layout.", false, true));
    templateRepository.save(new Template("compact", "Compact ATS", "Dense keyword-friendly resume.", true, false));
  }
}

