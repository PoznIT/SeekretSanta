package com.seekretsanta.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SeekretDto {
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
