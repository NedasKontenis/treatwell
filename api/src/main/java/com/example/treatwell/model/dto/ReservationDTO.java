package com.example.treatwell.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Long id;
    private LocalDateTime dateTime;
    private String notes;
    private String status;
    private double totalPrice;
    private Long userId;
    private Long serviceId;
}