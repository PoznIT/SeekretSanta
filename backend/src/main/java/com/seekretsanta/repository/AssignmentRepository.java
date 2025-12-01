package com.seekretsanta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seekretsanta.model.Assignment;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findBySeekretId(Long seekretId);
    Assignment findBySeekretIdAndGiverId(Long seekretId, Long giverId);
    void deleteBySeekretId(Long seekretId);
}
