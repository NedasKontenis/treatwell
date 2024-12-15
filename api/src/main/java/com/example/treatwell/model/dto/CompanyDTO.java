package com.example.treatwell.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {
    private Long id;
    private String name;
    private String registrationCode;
    private String description;
    private String address;
    private String phoneNumber;
    private String email;
    private Long ownerId;
}