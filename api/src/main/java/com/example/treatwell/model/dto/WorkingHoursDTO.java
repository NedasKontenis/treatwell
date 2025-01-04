package com.example.treatwell.model.dto;

import lombok.Data;

@Data
public class WorkingHoursDTO {
    private String dayOfWeek;
    private String openTime;
    private String closeTime;
}