package com.seekretsanta.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class SeekretDto {
    // Getters and setters
    private Long id;
    private String name;
    private String uniqueLink;
    private LocalDateTime createdAt;
    private boolean assignmentsGenerated;
    private String ownerName;
    private List<ParticipantDto> participants;
    private List<ConstraintDto> constraints;
    private List<AssignmentDto> assignments;
}
