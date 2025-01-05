package com.example.treatwell.service;

import com.example.treatwell.exception.ResourceNotFoundException;
import com.example.treatwell.model.Company;
import com.example.treatwell.model.PRSService;
import com.example.treatwell.model.ServiceCategory;
import com.example.treatwell.model.dto.PRSServiceDTO;
import com.example.treatwell.repository.CompanyRepository;
import com.example.treatwell.repository.PRSServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PRSServiceService {
    private final PRSServiceRepository serviceRepository;
    private final CompanyRepository companyRepository;

    public List<PRSServiceDTO> getServicesByCompany(Long companyId) {
        return serviceRepository.findByCompanyId(companyId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PRSServiceDTO createService(PRSServiceDTO serviceDTO) {
        Company company = companyRepository.findById(serviceDTO.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        PRSService service = PRSService.builder()
                .name(serviceDTO.getName())
                .description(serviceDTO.getDescription())
                .price(serviceDTO.getPrice())
                .durationMinutes(serviceDTO.getDurationMinutes())
                .company(company)
                .isActive(true)
                .build();

        return toDTO(serviceRepository.save(service));
    }

    public PRSServiceDTO updateService(Long id, PRSServiceDTO serviceDTO) {
        PRSService service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        service.setName(serviceDTO.getName());
        service.setDescription(serviceDTO.getDescription());
        service.setPrice(serviceDTO.getPrice());
        service.setDurationMinutes(serviceDTO.getDurationMinutes());

        return toDTO(serviceRepository.save(service));
    }

    public void deleteService(Long id) {
        PRSService service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
        service.setActive(false);
        serviceRepository.save(service);
    }

    private PRSServiceDTO toDTO(PRSService service) {
        return PRSServiceDTO.builder()
                .id(service.getId())
                .name(service.getName())
                .description(service.getDescription())
                .price(service.getPrice())
                .durationMinutes(service.getDurationMinutes())
                .companyId(service.getCompany().getId())
                .build();
    }

    public PRSServiceDTO getServiceById(Long serviceId) {
        PRSService prsService = serviceRepository.findById(serviceId).orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        return toDTO(prsService);
    }
}