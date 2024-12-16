package com.example.treatwell.webControllers;

import com.example.treatwell.model.dto.PRSServiceDTO;
import com.example.treatwell.service.PRSServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PRSServiceController {
    private final PRSServiceService serviceService;

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