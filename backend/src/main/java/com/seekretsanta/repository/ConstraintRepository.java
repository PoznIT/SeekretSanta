package com.seekretsanta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seekretsanta.model.Constraint;

@Repository
public interface ConstraintRepository extends JpaRepository<Constraint, Long> {
    List<Constraint> findBySeekretId(Long seekretId);
    void deleteBySeekretId(Long seekretId);
}
