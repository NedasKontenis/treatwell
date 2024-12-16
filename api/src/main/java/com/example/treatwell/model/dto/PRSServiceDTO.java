package com.example.treatwell.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PRSServiceDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private Integer durationMinutes;
    private Long companyId;
    private String imageUrl;
}