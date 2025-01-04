package com.example.treatwell.repository;

import com.example.treatwell.model.Image;
import com.example.treatwell.model.EntityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByEntityTypeAndEntityId(EntityType entityType, Long entityId);
}