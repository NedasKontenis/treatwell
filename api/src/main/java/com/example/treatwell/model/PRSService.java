package com.example.treatwell.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "services")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PRSService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    private double price;
    private Integer durationMinutes;
    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    private String imageUrl;
}