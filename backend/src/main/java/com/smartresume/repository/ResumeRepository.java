package com.smartresume.repository;

import com.smartresume.model.Resume;
import com.smartresume.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, UUID> {
  List<Resume> findByUserOrderByUpdatedAtDesc(User user);
  Optional<Resume> findByShareSlug(String shareSlug);
}

