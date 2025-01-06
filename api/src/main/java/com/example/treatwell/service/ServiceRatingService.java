package com.example.treatwell.service;

import com.example.treatwell.exception.ResourceNotFoundException;
import com.example.treatwell.model.*;
import com.example.treatwell.model.dto.CreateServiceRatingDTO;
import com.example.treatwell.model.dto.ServiceRatingDTO;
import com.example.treatwell.model.dto.UpdateServiceRatingDTO;
import com.example.treatwell.repository.PRSServiceRepository;
import com.example.treatwell.repository.ReservationRepository;
import com.example.treatwell.repository.ServiceRatingRepository;
import com.example.treatwell.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceRatingService {
    private final ServiceRatingRepository ratingRepository;
    private final PRSServiceRepository serviceRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public ServiceRatingDTO createRating(CreateServiceRatingDTO ratingDTO) {
        Reservation reservation = reservationRepository.findById(ratingDTO.getReservationId())
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

        if (reservation.getStatus() != ReservationStatus.COMPLETED) {
            throw new IllegalStateException("Cannot rate a service for non-completed reservation");
        }

        if (ratingRepository.existsByReservationId(ratingDTO.getReservationId())) {
            throw new IllegalStateException("Rating already exists for this reservation");
        }

        if (!reservation.getUser().getId().equals(ratingDTO.getUserId())) {
            throw new IllegalStateException("User did not make this reservation");
        }

        PRSService service = serviceRepository.findById(ratingDTO.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        User user = userRepository.findById(ratingDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        ServiceRating rating = ServiceRating.builder()
                .rating(ratingDTO.getRating())
                .comment(ratingDTO.getComment())
                .createdAt(LocalDateTime.now())
                .service(service)
                .user(user)
                .reservation(reservation)
                .build();

        ServiceRating savedRating = ratingRepository.save(rating);

        updateServiceAverageRating(service);

        return toDTO(savedRating);
    }


    private void updateServiceAverageRating(PRSService service) {
        List<ServiceRating> ratings = ratingRepository.findByServiceId(service.getId());
        double averageRating = ratings.stream()
                .mapToInt(ServiceRating::getRating)
                .average()
                .orElse(0.0);

        service.setAverageRating(averageRating);
        service.setTotalRatings(ratings.size());
        serviceRepository.save(service);
    }

    private ServiceRatingDTO toDTO(ServiceRating rating) {
        return ServiceRatingDTO.builder()
                .id(rating.getId())
                .rating(rating.getRating())
                .comment(rating.getComment())
                .createdAt(rating.getCreatedAt())
                .serviceId(rating.getService().getId())
                .userId(rating.getUser().getId())
                .reservationId(rating.getReservation().getId())
                .build();
    }

    public List<ServiceRatingDTO> getServiceRatings(Long serviceId) {
        return ratingRepository.findByServiceId(serviceId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ServiceRatingDTO getServiceRatingByReservation(Long serviceId, Long reservationId) {
        ServiceRating rating = ratingRepository.findByServiceIdAndReservationId(serviceId, reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not found for service and reservation"));

        return toDTO(rating);
    }

    public ServiceRatingDTO updateRating(Long serviceId, Long reservationId, UpdateServiceRatingDTO updateDTO) {
        ServiceRating rating = ratingRepository.findByServiceIdAndReservationId(serviceId, reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not found"));

        if (updateDTO.getRating() != null && (updateDTO.getRating() < 1 || updateDTO.getRating() > 5)) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        if (updateDTO.getRating() != null) {
            rating.setRating(updateDTO.getRating());
        }
        if (updateDTO.getComment() != null) {
            rating.setComment(updateDTO.getComment());
        }

        ServiceRating updatedRating = ratingRepository.save(rating);
        updateServiceAverageRating(updatedRating.getService());

        return toDTO(updatedRating);
    }
}