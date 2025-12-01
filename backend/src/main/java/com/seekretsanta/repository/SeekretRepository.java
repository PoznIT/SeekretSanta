package com.seekretsanta.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seekretsanta.model.Seekret;

@Repository
public interface SeekretRepository extends JpaRepository<Seekret, Long> {
    Optional<Seekret> findByUniqueLink(String uniqueLink);
    List<Seekret> findByOwnerId(Long ownerId);
    void deleteSeekretByUniqueLink(String uniqueLink);
}
