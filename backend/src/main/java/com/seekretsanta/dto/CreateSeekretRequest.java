package com.seekretsanta.dto;

import java.util.List;

import lombok.Data;


@Data
public class CreateSeekretRequest {
    private String name;
    private List<ParticipantDto> participants;
    private List<ConstraintDto> constraints;

}
