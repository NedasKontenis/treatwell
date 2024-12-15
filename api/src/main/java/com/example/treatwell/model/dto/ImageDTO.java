package com.example.treatwell.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {
    private Long id;
    private String fileName;
    private String contentType;
    private String type;        // ImageType as string
    private String entityType;  // EntityType as string
    private Long entityId;
    private LocalDateTime uploadedAt;
}