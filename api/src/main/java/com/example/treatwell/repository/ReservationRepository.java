package com.example.treatwell.repository;

import com.example.treatwell.model.Reservation;
import com.example.treatwell.model.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByServiceId(Long serviceId);
    List<Reservation> findByServiceIdAndDateTimeBetween(Long serviceId, LocalDateTime start, LocalDateTime end);
    List<Reservation> findByStatus(ReservationStatus status);
}