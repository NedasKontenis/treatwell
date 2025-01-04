package com.example.treatwell.repository;

import com.example.treatwell.model.Role;
import com.example.treatwell.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    void deleteAllByRoleNot(Role role);
    void deleteByEmail(String email);
}