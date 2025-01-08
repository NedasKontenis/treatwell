package com.example.treatwell.service;

import com.example.treatwell.model.Company;
import com.example.treatwell.model.PRSService;
import com.example.treatwell.model.Reservation;
import com.example.treatwell.model.dto.PRSServiceDTO;
import com.example.treatwell.model.dto.PRSServiceWithReservationsDTO;
import com.example.treatwell.model.dto.ReportDTO;
import com.example.treatwell.model.dto.ReservationDTO;
import com.example.treatwell.repository.CompanyRepository;
import com.example.treatwell.repository.PRSServiceRepository;
import com.example.treatwell.repository.ReservationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final CompanyRepository companyRepository;
    private final PRSServiceRepository serviceRepository;
    private final ReservationRepository reservationRepository;

    public ReportDTO generateReport(Long companyId) {
        // Get company details
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new EntityNotFoundException("Company not found"));

        // Create the base ReportDTO with company info
        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setCompanyName(company.getName());
        reportDTO.setRegistrationCode(company.getRegistrationCode());
        reportDTO.setAddress(company.getAddress());
        reportDTO.setPhoneNumber(company.getPhoneNumber());
        reportDTO.setEmail(company.getEmail());

        // Get all services for the company and map them
        List<PRSServiceDTO> services = serviceRepository.findByCompanyId(companyId)
                .stream()
                .map(this::mapToServiceDTO)
                .collect(Collectors.toList());

        // Create list to hold services with their reservations
        List<PRSServiceWithReservationsDTO> servicesWithReservations = new ArrayList<>();

        // For each service, get its reservations and create the combined DTO
        for (PRSServiceDTO service : services) {
            List<ReservationDTO> reservations = reservationRepository
                    .findByServiceId(service.getId())
                    .stream()
                    .map(this::mapToReservationDTO)
                    .collect(Collectors.toList());

            PRSServiceWithReservationsDTO serviceWithReservations =
                    new PRSServiceWithReservationsDTO(service, reservations);

            servicesWithReservations.add(serviceWithReservations);
        }

        // Set the services list in the report
        reportDTO.setServices(servicesWithReservations);

        return reportDTO;
    }

    private PRSServiceDTO mapToServiceDTO(PRSService service) {
        return PRSServiceDTO.builder()
                .id(service.getId())
                .name(service.getName())
                .description(service.getDescription())
                .price(service.getPrice())
                .durationMinutes(service.getDurationMinutes())
                .companyId(service.getCompany().getId())
                .imageUrl(service.getImageUrl())
                .averageRating(service.getAverageRating())
                .totalRatings(service.getTotalRatings())
                .build();
    }

    private ReservationDTO mapToReservationDTO(Reservation reservation) {
        return ReservationDTO.builder()
                .id(reservation.getId())
                .dateTime(reservation.getDateTime())
                .notes(reservation.getNotes())
                .status(String.valueOf(reservation.getStatus()))
                .totalPrice(reservation.getTotalPrice())
                .userId(reservation.getUser().getId())
                .serviceId(reservation.getService().getId())
                .build();
    }
}