package com.seekretsanta.dto;

import lombok.Data;
import java.util.List;


@Data
public class CreateSeekretRequest {
    private String name;
    private List<ParticipantDto> participants;
    private List<ConstraintDto> constraints;

}
