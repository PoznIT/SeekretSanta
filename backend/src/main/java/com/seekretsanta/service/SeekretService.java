package com.seekretsanta.service;

import com.seekretsanta.dto.*;
import com.seekretsanta.model.*;
import com.seekretsanta.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SeekretService {

    @Autowired
    private SeekretRepository seekretRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private ConstraintRepository constraintRepository;


    private List<Participant> setParticipants(Seekret seekret, List<ParticipantDto> participantDtos) {
        List<Participant> participants = new ArrayList<>();
        for (ParticipantDto participantDto : participantDtos) {
            Participant participant = new Participant(
                    participantDto.getName(),
                    participantDto.getEmail(),
                    seekret
            );
            participants.add(participant);
        }
        return participants;
    }

    private List<Constraint> setConstraints(Seekret seekret, List<ConstraintDto> constraintDtos) {
        List<Constraint> constraints = new ArrayList<>();
        for (ConstraintDto constraintDto : constraintDtos) {
            if (constraintDto.getGiverEmail() == null && constraintDto.getCannotReceiveEmail() == null) {
                continue;
            }
            Long giverId = participantRepository.findByEmailAndSeekretId(constraintDto.getGiverEmail(), seekret.getId()).getId();
            Long cannotReceiveId = participantRepository.findByEmailAndSeekretId(constraintDto.getCannotReceiveEmail(), seekret.getId()).getId();
            if (giverId == null || cannotReceiveId == null)
                continue;
            Participant giver = participantRepository.findById(giverId)
                    .orElseThrow(() -> new RuntimeException("Giver not found by id"));
            Participant cannotReceive = participantRepository.findById(cannotReceiveId)
                    .orElseThrow(() -> new RuntimeException("Cannot receive participant not found by id"));
            Constraint constraint = new Constraint(giver, cannotReceive, seekret);
            constraints.add(constraint);
        }
        return constraints;
    }

    @Transactional
    public SeekretDto createSeekret(CreateSeekretRequest request, User owner) {
        Seekret seekret = new Seekret(request.getName(), owner);
        seekret = seekretRepository.save(seekret);
        seekret.setParticipants(this.setParticipants(seekret, request.getParticipants()));
        seekret.setConstraints(this.setConstraints(seekret, request.getConstraints()));
        seekret = seekretRepository.save(seekret);
        return convertToDto(seekret);
    }

    @Transactional
    public SeekretDto updateSeekret(UpdateSeekretRequest request, User owner) {
        seekretRepository.deleteSeekretByUniqueLink(request.getUniqueLink());
        return this.createSeekret(request.getSeekretRequest(), owner);
    }

    @Transactional
    public SeekretDto generateAssignments(String uniqueLink) {
        Seekret seekret = seekretRepository.findByUniqueLink(uniqueLink)
                .orElseThrow(() -> new RuntimeException("Seekret not found"));

        if (seekret.isAssignmentsGenerated()) {
            throw new RuntimeException("Assignments already generated");
        }

        List<Participant> participants = participantRepository.findBySeekretId(seekret.getId());
        List<Constraint> constraints = constraintRepository.findBySeekretId(seekret.getId());

        // Generate valid assignments
        List<Assignment> assignments = generateValidAssignments(participants, constraints, seekret);

        if (assignments.isEmpty()) {
            throw new RuntimeException("Cannot generate valid assignments with given constraints");
        }

        assignmentRepository.saveAll(assignments);
        seekret.setAssignmentsGenerated(true);
        seekretRepository.save(seekret);

        return convertToDto(seekret);
    }

    private List<Assignment> generateValidAssignments(List<Participant> participants,
                                                    List<Constraint> constraints,
                                                    Seekret seekret) {
        // Create constraint map for quick lookup
        Map<Long, Set<Long>> constraintMap = new HashMap<>();
        for (Constraint constraint : constraints) {
            constraintMap
                .computeIfAbsent(constraint.getGiver().getId(), k -> new HashSet<>())
                .add(constraint.getCannotReceive().getId());
        }

        // Try to generate valid assignments (max 1000 attempts)
        for (int attempt = 0; attempt < 1000; attempt++) {
            List<Assignment> assignments = new ArrayList<>();
            List<Participant> availableReceivers = new ArrayList<>(participants);
            boolean validAssignment = true;

            for (Participant giver : participants) {
                List<Participant> validReceivers = availableReceivers.stream()
                        .filter(receiver -> !receiver.getId().equals(giver.getId())) // Can't give to self
                        .filter(receiver -> !constraintMap.getOrDefault(giver.getId(), Collections.emptySet())
                                .contains(receiver.getId())) // Check constraints
                        .collect(Collectors.toList());

                if (validReceivers.isEmpty()) {
                    validAssignment = false;
                    break;
                }

                // Random selection
                Participant receiver = validReceivers.get(new Random().nextInt(validReceivers.size()));
                assignments.add(new Assignment(giver, receiver, seekret));
                availableReceivers.remove(receiver);
            }

            if (validAssignment) {
                return assignments;
            }
        }

        return Collections.emptyList(); // Failed to generate valid assignments
    }

    public SeekretDto getSeekretByLink(String uniqueLink) {
        Seekret seekret = seekretRepository.findByUniqueLink(uniqueLink)
                .orElseThrow(() -> new RuntimeException("Seekret not found"));
        return convertToDto(seekret);
    }

    public String getSeekretNameByLink(String uniqueLink) {
        Seekret seekret = seekretRepository.findByUniqueLink(uniqueLink)
                .orElseThrow(() -> new RuntimeException("Seekret not found"));
        return seekret.getName();
    }

    public List<SeekretDto> getUserSeekrets(User user) {
        List<Seekret> seekrets = seekretRepository.findByOwnerId(user.getId());
        return seekrets.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private SeekretDto convertToDto(Seekret seekret) {
        SeekretDto dto = new SeekretDto();
        dto.setId(seekret.getId());
        dto.setName(seekret.getName());
        dto.setUniqueLink(seekret.getUniqueLink());
        dto.setCreatedAt(seekret.getCreatedAt());
        dto.setAssignmentsGenerated(seekret.isAssignmentsGenerated());
        dto.setOwnerName(seekret.getOwner().getName());

        // Convert participants
        List<Participant> participants = participantRepository.findBySeekretId(seekret.getId());
        dto.setParticipants(participants.stream()
                .map(p -> new ParticipantDto(p.getId(), p.getName(), p.getEmail()))
                .collect(Collectors.toList()));

        // Convert constraints
        List<Constraint> constraints = constraintRepository.findBySeekretId(seekret.getId());
        dto.setConstraints(constraints.stream()
                .map(c -> new ConstraintDto(
                        c.getGiver().getEmail(),
                        c.getCannotReceive().getEmail()
                ))
                .collect(Collectors.toList()));

        // Convert assignments if generated
        List<Assignment> assignments = assignmentRepository.findBySeekretId(seekret.getId());
        dto.setAssignments(assignments.stream()
                .map(a -> new AssignmentDto(
                        a.getId(),
                        new ParticipantDto(a.getGiver().getId(), a.getGiver().getName(), a.getGiver().getEmail()),
                        new ParticipantDto(a.getReceiver().getId(), a.getReceiver().getName(), a.getReceiver().getEmail())
                ))
                .collect(Collectors.toList()));

        return dto;
    }

    public Participant getAssignedParticipant(String uniqueLink, Long participantId) {
        Assignment assignment = assignmentRepository.findBySeekretIdAndGiverId(
                seekretRepository.findByUniqueLink(uniqueLink)
                        .orElseThrow(() -> new RuntimeException("Seekret not found")).getId(),
                participantId
        );
        if (assignment == null) {
            throw new RuntimeException("Assignment not found for participant");
        }
        return assignment.getReceiver();
    }
}
