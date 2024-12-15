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

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<CompanyDTO>> getCompaniesByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(companyService.getCompaniesByOwner(ownerId));
    }
}