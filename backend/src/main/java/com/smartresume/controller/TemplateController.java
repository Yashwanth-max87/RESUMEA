package com.smartresume.controller;

import com.smartresume.model.Template;
import com.smartresume.repository.TemplateRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {
  private final TemplateRepository templateRepository;

  public TemplateController(TemplateRepository templateRepository) {
    this.templateRepository = templateRepository;
  }

  @GetMapping
  public List<Template> list() {
    return templateRepository.findAll();
  }
}

