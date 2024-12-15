package com.example.treatwell.service;

import com.example.treatwell.model.Company;
import com.example.treatwell.model.User;
import com.example.treatwell.model.dto.CompanyDTO;
import com.example.treatwell.repository.CompanyRepository;
import com.example.treatwell.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        User owner = userRepository.findById(companyDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Company company = Company.builder()
                .name(companyDTO.getName())
                .registrationCode(companyDTO.getRegistrationCode())
                .description(companyDTO.getDescription())
                .address(companyDTO.getAddress())
                .phoneNumber(companyDTO.getPhoneNumber())
                .email(companyDTO.getEmail())
                .owner(owner)
                .isActive(true)
                .build();

        return mapToDTO(companyRepository.save(company));
    }

    public List<CompanyDTO> getCompaniesByOwner(Long ownerId) {
        return companyRepository.findByOwnerId(ownerId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private CompanyDTO mapToDTO(Company company) {
        return CompanyDTO.builder()
                .id(company.getId())
                .name(company.getName())
                .registrationCode(company.getRegistrationCode())
                .description(company.getDescription())
                .address(company.getAddress())
                .phoneNumber(company.getPhoneNumber())
                .email(company.getEmail())
                .ownerId(company.getOwner().getId())
                .build();
    }
}