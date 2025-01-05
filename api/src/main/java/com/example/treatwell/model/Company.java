package com.example.treatwell.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "companies")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String registrationCode;

    private String description;
    private String address;
    private String phoneNumber;
    private String email;

    // isActive false by default, this requires System Admin to approve the company. While isActive false, company only visible to Company Admin.
    private boolean isActive = false;

    @Column(name = "logo_url")
    private String logoUrl;

    @ElementCollection
    @CollectionTable(name = "company_working_hours", joinColumns = @JoinColumn(name = "company_id"))
    private List<WorkingHours> workingHours;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<PRSService> services;

    @Enumerated(EnumType.STRING)
    private ServiceCategory category;

    private boolean isSubmissionCancelled = false;
}