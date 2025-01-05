package com.example.treatwell.webControllers;

import com.example.treatwell.model.ReservationStatus;
import com.example.treatwell.model.dto.ReservationDTO;
import com.example.treatwell.model.dto.ReservationMappedWithServiceDTO;
import com.example.treatwell.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        return ResponseEntity.ok(reservationService.createReservation(reservationDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservation(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationMappedWithServiceDTO>> getUserReservations(@PathVariable Long userId) {
        return ResponseEntity.ok(reservationService.getUserReservationWithServiceData(userId));
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<ReservationMappedWithServiceDTO>> getServiceReservations(@PathVariable Long serviceId) {
        return ResponseEntity.ok(reservationService.getServiceReservationsWithServiceData(serviceId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservationStatus(
            @PathVariable Long id,
            @RequestParam ReservationStatus status) {

        return ResponseEntity.ok(reservationService.updateReservationStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.ok().build();
    }
}