package com.example.treatwell.repository;

import com.example.treatwell.model.ServiceRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRatingRepository extends JpaRepository<ServiceRating, Long> {
    List<ServiceRating> findByServiceId(Long serviceId);
    boolean existsByReservationId(Long reservationId);
    Optional<ServiceRating> findByReservationId(Long reservationId);
    Optional<ServiceRating> findByServiceIdAndReservationId(Long serviceId, Long reservationId);
}