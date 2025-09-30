package com.seekretsanta.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConstraintDto {
    private String giverEmail;
    private String cannotReceiveEmail;
}
