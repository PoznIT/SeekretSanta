package com.seekretsanta.repository;

import com.seekretsanta.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findBySeekretId(Long seekretId);
    Assignment findBySeekretIdAndGiverId(Long seekretId, Long giverId);
    void deleteBySeekretId(Long seekretId);
}
