package com.seekretsanta.repository;

import com.seekretsanta.model.Constraint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConstraintRepository extends JpaRepository<Constraint, Long> {
    List<Constraint> findBySeekretId(Long seekretId);
    void deleteBySeekretId(Long seekretId);
}
