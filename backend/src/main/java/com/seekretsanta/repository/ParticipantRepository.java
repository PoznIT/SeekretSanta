package com.seekretsanta.repository;

import com.seekretsanta.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findBySeekretId(Long seekretId);
    Participant findByEmailAndSeekretId(String email, Long seekretId);
    void deleteBySeekretId(Long seekretId);
}
