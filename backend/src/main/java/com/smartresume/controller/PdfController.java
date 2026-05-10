package com.smartresume.controller;

import com.smartresume.dto.ResumeDtos.PdfRequest;
import com.smartresume.service.PdfService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {
  private final PdfService pdfService;

  public PdfController(PdfService pdfService) {
    this.pdfService = pdfService;
  }

  @PostMapping("/generate")
  public ResponseEntity<byte[]> generate(@RequestBody PdfRequest request) {
    String fileName = request.fileName() == null ? "resume.pdf" : request.fileName();
    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_PDF)
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
        .body(pdfService.renderHtml(request.html()));
  }
}

