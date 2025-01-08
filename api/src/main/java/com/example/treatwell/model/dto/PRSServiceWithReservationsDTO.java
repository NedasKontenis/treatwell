package com.example.treatwell.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PRSServiceWithReservationsDTO extends PRSServiceDTO {
    private List<ReservationDTO> reservations;

    public PRSServiceWithReservationsDTO(PRSServiceDTO service, List<ReservationDTO> reservations) {
        setId(service.getId());
        setName(service.getName());
        setDescription(service.getDescription());
        setPrice(service.getPrice());
        setDurationMinutes(service.getDurationMinutes());
        setCompanyId(service.getCompanyId());
        setImageUrl(service.getImageUrl());
        setAverageRating(service.getAverageRating());
        setTotalRatings(service.getTotalRatings());
        this.reservations = reservations;
    }

    @Builder(builderMethodName = "childBuilder")
    public PRSServiceWithReservationsDTO(
            Long id,
            String name,
            String description,
            double price,
            Integer durationMinutes,
            Long companyId,
            String imageUrl,
            Double averageRating,
            Integer totalRatings,
            List<ReservationDTO> reservations) {
        super(id, name, description, price, durationMinutes, companyId, imageUrl, averageRating, totalRatings);
        this.reservations = reservations;
    }
}
