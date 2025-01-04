package com.example.treatwell.repository;

import com.example.treatwell.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findByOwnerId(Long ownerId);
    boolean existsByRegistrationCode(String registrationCode);
    Optional<Company> findByRegistrationCode(String registrationCode);
}