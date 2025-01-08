package com.example.treatwell.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportDTO {
    private String companyName;
    private String registrationCode;
    private String address;
    private String phoneNumber;
    private String email;

    private List<PRSServiceWithReservationsDTO> services;
}
