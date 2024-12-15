package com.example.treatwell.service;

import com.example.treatwell.exception.ResourceNotFoundException;
import com.example.treatwell.mapper.CompanyMapper;
import com.example.treatwell.model.Company;
import com.example.treatwell.model.User;
import com.example.treatwell.model.WorkingHours;
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
    private final CompanyMapper companyMapper;

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
                .logoUrl(companyDTO.getLogoUrl())
                .workingHours(companyDTO.getWorkingHours())
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
                .logoUrl(company.getLogoUrl())
                .workingHours(company.getWorkingHours())
                .build();
    }

    public CompanyDTO updateCompany(CompanyDTO companyDTO) {
        Company company = companyRepository.findById(companyDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + companyDTO.getId()));

        company.setDescription(companyDTO.getDescription());
        company.setAddress(companyDTO.getAddress());
        company.setPhoneNumber(companyDTO.getPhoneNumber());
        company.setEmail(companyDTO.getEmail());

        if (companyDTO.getWorkingHours() != null) {
            company.getWorkingHours().clear();
            company.getWorkingHours().addAll(
                    companyDTO.getWorkingHours().stream()
                            .map(workingHourDTO -> new WorkingHours(
                                    workingHourDTO.getDayOfWeek(),
                                    workingHourDTO.getOpenTime(),
                                    workingHourDTO.getCloseTime()
                            ))
                            .collect(Collectors.toList())
            );
        }

        Company updatedCompany = companyRepository.save(company);
        return companyMapper.toDTO(updatedCompany);
    }
}