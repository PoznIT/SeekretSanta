package com.seekretsanta.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ConstraintDto {
    private String giverEmail;
    private String cannotReceiveEmail;
    private String type;
}
