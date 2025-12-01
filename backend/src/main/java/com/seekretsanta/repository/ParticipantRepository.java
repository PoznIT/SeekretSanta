package com.seekretsanta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seekretsanta.model.Participant;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findBySeekretId(Long seekretId);
    Participant findByEmailAndSeekretId(String email, Long seekretId);
    void deleteBySeekretId(Long seekretId);
}
