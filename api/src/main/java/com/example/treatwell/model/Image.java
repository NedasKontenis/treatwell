package com.example.treatwell.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "images")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "data", columnDefinition="LONGBLOB", nullable = false)
    private byte[] data;

    @Column(nullable = false)
    private String fileName;

    private String contentType;

    @Enumerated(EnumType.STRING)
    private ImageType type;

    @Enumerated(EnumType.STRING)
    private EntityType entityType;

    private Long entityId;
    private LocalDateTime uploadedAt;
}