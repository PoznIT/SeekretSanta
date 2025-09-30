package com.seekretsanta.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateSeekretRequest {
    private CreateSeekretRequest seekretRequest;
    private String uniqueLink;
}
