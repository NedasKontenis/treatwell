package com.example.treatwell.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

//    @Column(name = "imageUrl", nullable = false)
//    private String imageUrl; // URL to the uploaded image
//
//    @ManyToOne
//    @JoinColumn(name = "company_id", nullable = false)
//    private Company company;

    // Getters and Setters
}
