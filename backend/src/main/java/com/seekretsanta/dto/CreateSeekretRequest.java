package com.seekretsanta.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class CreateSeekretRequest {
    private String name;
    private List<ParticipantDto> participants;
    private List<ConstraintDto> constraints;

}
