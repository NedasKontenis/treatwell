package com.example.treatwell.webControllers;

import com.example.treatwell.model.dto.CompanyDTO;
import com.example.treatwell.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CompanyController {
    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyDTO> createCompany(@RequestBody CompanyDTO companyDTO) {
        return ResponseEntity.ok(companyService.createCompany(companyDTO));
    }

    @GetMapping
    public ResponseEntity<List<CompanyDTO>> getCompanies(
            @RequestParam(required = false) Boolean isApproved) {
        return ResponseEntity.ok(companyService.getCompanies(isApproved));
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<CompanyDTO>> getCompaniesByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(companyService.getCompaniesByOwner(ownerId));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<CompanyDTO> updateCompanyStatus(@PathVariable Long id, @RequestParam Boolean isApproved) {
        return ResponseEntity.ok(companyService.updateCompanyStatus(id, isApproved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyDTO> updateCompany(
            @PathVariable Long id,
            @RequestBody CompanyDTO companyDTO
    ) {
        companyDTO.setId(id);
        return ResponseEntity.ok(companyService.updateCompany(companyDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompany(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getCompany(id));
    }
}