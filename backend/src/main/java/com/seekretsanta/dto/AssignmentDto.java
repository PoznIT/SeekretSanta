package com.seekretsanta.dto;

public class AssignmentDto {
    private Long id;
    private ParticipantDto giver;
    private ParticipantDto receiver;

    public AssignmentDto() {}

    public AssignmentDto(Long id, ParticipantDto giver, ParticipantDto receiver) {
        this.id = id;
        this.giver = giver;
        this.receiver = receiver;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ParticipantDto getGiver() { return giver; }
    public void setGiver(ParticipantDto giver) { this.giver = giver; }

    public ParticipantDto getReceiver() { return receiver; }
    public void setReceiver(ParticipantDto receiver) { this.receiver = receiver; }
}
