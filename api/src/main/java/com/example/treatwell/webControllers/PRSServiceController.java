package com.example.treatwell.webControllers;

import com.example.treatwell.model.dto.CreateServiceRatingDTO;
import com.example.treatwell.model.dto.PRSServiceDTO;
import com.example.treatwell.model.dto.ServiceRatingDTO;
import com.example.treatwell.model.dto.UpdateServiceRatingDTO;
import com.example.treatwell.service.PRSServiceService;
import com.example.treatwell.service.ReservationService;
import com.example.treatwell.service.ServiceRatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PRSServiceController {
    private final PRSServiceService serviceService;
    private final ReservationService reservationService;
    private final ServiceRatingService ratingService;

    @GetMapping("/{serviceId}/available-slots")
    public ResponseEntity<List<LocalDateTime>> getAvailableSlots(
            @PathVariable Long serviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
    ) {
        return ResponseEntity.ok(reservationService.getAvailableSlots(serviceId, date));
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<PRSServiceDTO> getServiceById(@PathVariable Long serviceId) {
        return ResponseEntity.ok(serviceService.getServiceById(serviceId));
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<PRSServiceDTO>> getCompanyServices(@PathVariable Long companyId) {
        return ResponseEntity.ok(serviceService.getServicesByCompany(companyId));
    }

    @GetMapping("/{serviceId}/ratings")
    public ResponseEntity<List<ServiceRatingDTO>> getServiceRatings(@PathVariable Long serviceId) {
        return ResponseEntity.ok(ratingService.getServiceRatings(serviceId));
    }

    @GetMapping("/{serviceId}/ratings/reservation/{reservationId}")
    public ResponseEntity<ServiceRatingDTO> getServiceRatingByReservation(@PathVariable Long serviceId, @PathVariable Long reservationId) {
        return ResponseEntity.ok(ratingService.getServiceRatingByReservation(serviceId, reservationId));
    }

    @PostMapping
    public ResponseEntity<PRSServiceDTO> createService(@RequestBody PRSServiceDTO serviceDTO) {
        return ResponseEntity.ok(serviceService.createService(serviceDTO));
    }

    @PostMapping("/{serviceId}/ratings")
    public ResponseEntity<ServiceRatingDTO> rateService(
            @PathVariable Long serviceId,
            @RequestBody CreateServiceRatingDTO ratingDTO) {
        ratingDTO.setServiceId(serviceId);
        return ResponseEntity.ok(ratingService.createRating(ratingDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PRSServiceDTO> updateService(
            @PathVariable Long id,
            @RequestBody PRSServiceDTO serviceDTO
    ) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceDTO));
    }

    @PutMapping("/{serviceId}/ratings/{reservationId}")
    public ResponseEntity<ServiceRatingDTO> updateRating(
            @PathVariable Long serviceId,
            @PathVariable Long reservationId,
            @RequestBody UpdateServiceRatingDTO ratingDTO) {
        return ResponseEntity.ok(ratingService.updateRating(serviceId, reservationId, ratingDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.ok().build();
    }
}