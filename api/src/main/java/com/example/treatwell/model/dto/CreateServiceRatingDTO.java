package com.example.treatwell.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateServiceRatingDTO {
    private Integer rating;
    private String comment;
    private Long serviceId;
    private Long userId;
    private Long reservationId;
}