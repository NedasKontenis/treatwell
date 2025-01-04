package com.example.treatwell.service;

import com.example.treatwell.model.Role;
import com.example.treatwell.model.User;
import com.example.treatwell.repository.CompanyRepository;
import com.example.treatwell.repository.PRSServiceRepository;
import com.example.treatwell.repository.UserRepository;
import com.example.treatwell.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Profile("cypress")
@RequiredArgsConstructor
public class TestDataService {
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PRSServiceRepository serviceRepository;
    private final ReservationRepository reservationRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void cleanupDatabase() {
        reservationRepository.deleteAll();
        serviceRepository.deleteAll();
        companyRepository.deleteAll();
        userRepository.deleteAllByRoleNot(Role.SYSTEM_ADMIN);
    }

    @Transactional
    public User createTestUser() {
        // First clean any existing test users
        userRepository.deleteByEmail("test@example.com");

        User testUser = User.builder()
                .email("test@example.com")
                .password(passwordEncoder.encode("Test123!"))
                .firstName("Test")
                .lastName("User")
                .phoneNumber("+37061234567")
                .role(Role.COMPANY_ADMIN)
                .isActive(true)
                .build();

        return userRepository.save(testUser);
    }
}