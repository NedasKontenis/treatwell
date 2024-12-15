package com.example.treatwell.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkingHours {
    private String dayOfWeek;
    private String openTime;
    private String closeTime;
}