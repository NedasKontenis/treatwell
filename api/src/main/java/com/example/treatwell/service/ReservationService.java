package com.example.treatwell.service;

import com.example.treatwell.exception.ResourceNotFoundException;
import com.example.treatwell.model.*;
import com.example.treatwell.model.dto.ReservationDTO;
import com.example.treatwell.repository.ReservationRepository;
import com.example.treatwell.repository.PRSServiceRepository;
import com.example.treatwell.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final PRSServiceRepository serviceRepository;


//    public List<LocalDateTime> getAvailableSlots(Long serviceId) {
//        try {
//            PRSService service = serviceRepository.findById(serviceId)
//                    .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));
//
//            LocalDate today = LocalDate.now();
//            LocalTime now = LocalTime.now();
//
//            Company company = service.getCompany();
//            String dayOfWeek = today.getDayOfWeek().name().toLowerCase();
//            WorkingHours workingHours = company.getWorkingHours().stream()
//                    .filter(hours -> hours.getDayOfWeek().equalsIgnoreCase(dayOfWeek))
//                    .findFirst()
//                    .orElse(null);
//
//            if (workingHours == null ||
//                    workingHours.getOpenTime() == null ||
//                    workingHours.getCloseTime() == null) {
//                return Collections.emptyList();
//            }
//
//            LocalTime openTime = LocalTime.parse(workingHours.getOpenTime());
//            LocalTime closeTime = LocalTime.parse(workingHours.getCloseTime());
//
//            // Return empty list if business is closed for today
//            if (now.isAfter(closeTime)) {
//                return Collections.emptyList();
//            }
//
//            if (service.getDurationMinutes() > ChronoUnit.MINUTES.between(now, closeTime)) {
//                return Collections.emptyList();
//            }
//
//            LocalDateTime startOfDay = today.atStartOfDay();
//            LocalDateTime endOfDay = today.atTime(23, 59, 59);
//
//            List<Reservation> existingReservations = reservationRepository
//                    .findByServiceIdAndDateTimeBetween(serviceId, startOfDay, endOfDay);
//
//            List<LocalDateTime> availableSlots = new ArrayList<>();
//            LocalTime currentTime = openTime;
//
//            // Generate slots
//            while (currentTime.isBefore(closeTime) &&
//                    currentTime.plusMinutes(service.getDurationMinutes()).isBefore(closeTime.plusMinutes(1))) {
//
//                LocalDateTime slotDateTime = LocalDateTime.of(today, currentTime);
//
//                if (slotDateTime.isBefore(LocalDateTime.now())) {
//                    currentTime = currentTime.plusMinutes(service.getDurationMinutes());
//                    continue;
//                }
//
//                boolean isAvailable = true;
//                LocalDateTime slotEnd = slotDateTime.plusMinutes(service.getDurationMinutes());
//
//                for (Reservation reservation : existingReservations) {
//                    if (reservation.getDateTime() == null) continue;
//
//                    LocalDateTime reservationEnd = reservation.getDateTime()
//                            .plusMinutes(service.getDurationMinutes());
//
//                    if (!(slotDateTime.isEqual(reservationEnd) || slotDateTime.isAfter(reservationEnd) ||
//                            slotEnd.isEqual(reservation.getDateTime()) || slotEnd.isBefore(reservation.getDateTime()))) {
//                        isAvailable = false;
//                        break;
//                    }
//                }
//
//                if (isAvailable) {
//                    availableSlots.add(slotDateTime);
//                }
//
//                currentTime = currentTime.plusMinutes(service.getDurationMinutes());
//            }
//
//            return availableSlots;
//
//        } catch (Exception e) {
//            log.error("Error calculating available slots", e);
//            throw e;
//        }
//    }

    public List<LocalDateTime> getAvailableSlots(Long serviceId, LocalDate requestedDate) {
        try {
            PRSService service = serviceRepository.findById(serviceId)
                    .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

            LocalDate today = LocalDate.now();
            LocalDate oneMonthAhead = today.plusMonths(1);

            // Validate requested date
            if (requestedDate.isBefore(today) || requestedDate.isAfter(oneMonthAhead)) {
                return Collections.emptyList();
            }

            Company company = service.getCompany();
            String dayOfWeek = requestedDate.getDayOfWeek().name().toLowerCase();

            WorkingHours workingHours = company.getWorkingHours().stream()
                    .filter(hours -> hours.getDayOfWeek().equalsIgnoreCase(dayOfWeek))
                    .findFirst()
                    .orElse(null);

            if (workingHours == null ||
                    workingHours.getOpenTime() == null ||
                    workingHours.getCloseTime() == null) {
                return Collections.emptyList();
            }

            LocalTime openTime = LocalTime.parse(workingHours.getOpenTime());
            LocalTime closeTime = LocalTime.parse(workingHours.getCloseTime());

            // If checking today's slots, need to consider current time
            if (requestedDate.equals(today)) {
                LocalTime now = LocalTime.now();

                // Return empty list if business is closed for today
                if (now.isAfter(closeTime)) {
                    return Collections.emptyList();
                }

                // Return empty list if there's not enough time left to complete the service
                if (now.plusMinutes(service.getDurationMinutes()).isAfter(closeTime)) {
                    return Collections.emptyList();
                }

                // Adjust openTime if it's before current time
                if (openTime.isBefore(now)) {
                    openTime = now;
                }
            }

            LocalDateTime startOfDay = requestedDate.atStartOfDay();
            LocalDateTime endOfDay = requestedDate.atTime(23, 59, 59);

            List<Reservation> existingReservations = reservationRepository
                    .findByServiceIdAndDateTimeBetween(serviceId, startOfDay, endOfDay);

            List<LocalDateTime> availableSlots = new ArrayList<>();
            LocalTime currentTime = openTime;

            // Generate slots
            while (currentTime.isBefore(closeTime) &&
                    currentTime.plusMinutes(service.getDurationMinutes()).isBefore(closeTime.plusMinutes(1))) {

                LocalDateTime slotDateTime = LocalDateTime.of(requestedDate, currentTime);

                boolean isAvailable = true;
                LocalDateTime slotEnd = slotDateTime.plusMinutes(service.getDurationMinutes());

                for (Reservation reservation : existingReservations) {
                    if (reservation.getDateTime() == null) continue;

                    LocalDateTime reservationEnd = reservation.getDateTime()
                            .plusMinutes(service.getDurationMinutes());

                    if (!(slotDateTime.isEqual(reservationEnd) || slotDateTime.isAfter(reservationEnd) ||
                            slotEnd.isEqual(reservation.getDateTime()) || slotEnd.isBefore(reservation.getDateTime()))) {
                        isAvailable = false;
                        break;
                    }
                }

                if (isAvailable) {
                    availableSlots.add(slotDateTime);
                }

                currentTime = currentTime.plusMinutes(service.getDurationMinutes());
            }

            return availableSlots;

        } catch (Exception e) {
            log.error("Error calculating available slots", e);
            throw e;
        }
    }

    @Transactional
    public ReservationDTO createReservation(ReservationDTO reservationDTO) {
        User user = userRepository.findById(reservationDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        PRSService service = serviceRepository.findById(reservationDTO.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        // Validate if the time slot is available
        validateTimeSlot(service.getId(), reservationDTO.getDateTime());

        Reservation reservation = Reservation.builder()
                .dateTime(reservationDTO.getDateTime())
                .notes(reservationDTO.getNotes())
                .status(ReservationStatus.PENDING)
                .totalPrice(service.getPrice())
                .user(user)
                .service(service)
                .build();

        return mapToDTO(reservationRepository.save(reservation));
    }

    public ReservationDTO getReservationById(Long id) {
        return mapToDTO(reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found")));
    }

    public List<ReservationDTO> getUserReservations(Long userId) {
        return reservationRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<ReservationDTO> getServiceReservations(Long serviceId) {
        return reservationRepository.findByServiceId(serviceId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReservationDTO updateReservationStatus(Long id, String status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus(ReservationStatus.valueOf(status));
        return mapToDTO(reservationRepository.save(reservation));
    }

    @Transactional
    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    private void validateTimeSlot(Long serviceId, LocalDateTime dateTime) {
        // First get the service to know its duration
        PRSService prsService = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        // Check if there are any existing reservations at the same time
        List<Reservation> existingReservations = reservationRepository
                .findByServiceIdAndDateTimeBetween(
                        serviceId,
                        dateTime,
                        dateTime.plusMinutes(prsService.getDurationMinutes())
                );

        if (!existingReservations.isEmpty()) {
            throw new RuntimeException("Time slot not available");
        }
    }

    private ReservationDTO mapToDTO(Reservation reservation) {
        return ReservationDTO.builder()
                .id(reservation.getId())
                .dateTime(reservation.getDateTime())
                .notes(reservation.getNotes())
                .status(reservation.getStatus().toString())
                .totalPrice(reservation.getTotalPrice())
                .userId(reservation.getUser().getId())
                .serviceId(reservation.getService().getId())
                .build();
    }
}