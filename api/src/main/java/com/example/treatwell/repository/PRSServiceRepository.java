package com.example.treatwell.repository;

import com.example.treatwell.model.PRSService;
import com.example.treatwell.model.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PRSServiceRepository extends JpaRepository<PRSService, Long> {
    List<PRSService> findByCompanyId(Long companyId);
    List<PRSService> findByCompanyIdAndIsActiveTrue(Long companyId);
    PRSService findPRSServiceById(Long serviceId);
}