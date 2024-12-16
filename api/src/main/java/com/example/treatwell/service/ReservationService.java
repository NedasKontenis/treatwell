package com.example.treatwell.service;

import com.example.treatwell.model.Reservation;
import com.example.treatwell.model.PRSService;
import com.example.treatwell.model.User;
import com.example.treatwell.model.dto.ReservationDTO;
import com.example.treatwell.model.ReservationStatus;
import com.example.treatwell.repository.ReservationRepository;
import com.example.treatwell.repository.PRSServiceRepository;
import com.example.treatwell.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final PRSServiceRepository serviceRepository;

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