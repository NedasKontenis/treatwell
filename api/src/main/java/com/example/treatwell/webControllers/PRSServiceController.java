package com.example.treatwell.webControllers;

import com.example.treatwell.model.dto.PRSServiceDTO;
import com.example.treatwell.service.PRSServiceService;
import com.example.treatwell.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PRSServiceController {
    private final PRSServiceService serviceService;
    private final ReservationService reservationService;

//    @GetMapping("/{serviceId}/available-slots")
//    public ResponseEntity<List<LocalDateTime>> getAvailableSlots(
//            @PathVariable Long serviceId) {
//        return ResponseEntity.ok(reservationService.getAvailableSlots(serviceId));
//    }

    @GetMapping("/{serviceId}/available-slots")
    public ResponseEntity<List<LocalDateTime>> getAvailableSlots(
            @PathVariable Long serviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
    ) {
        return ResponseEntity.ok(reservationService.getAvailableSlots(serviceId, date));
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<PRSServiceDTO>> getCompanyServices(@PathVariable Long companyId) {
        return ResponseEntity.ok(serviceService.getServicesByCompany(companyId));
    }

    @PostMapping
    public ResponseEntity<PRSServiceDTO> createService(@RequestBody PRSServiceDTO serviceDTO) {
        return ResponseEntity.ok(serviceService.createService(serviceDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PRSServiceDTO> updateService(
            @PathVariable Long id,
            @RequestBody PRSServiceDTO serviceDTO
    ) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.ok().build();
    }
}