package com.example.treatwell.service;

import com.example.treatwell.model.Image;
import com.example.treatwell.model.EntityType;
import com.example.treatwell.model.ImageType;
import com.example.treatwell.model.dto.ImageDTO;
import com.example.treatwell.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    private ImageDTO mapToDTO(Image image) {
        return ImageDTO.builder()
                .id(image.getId())
                .fileName(image.getFileName())
                .contentType(image.getContentType())
                .type(image.getType().toString())
                .entityType(image.getEntityType().toString())
                .entityId(image.getEntityId())
                .uploadedAt(image.getUploadedAt())
                .build();
    }

    @Transactional
    public ImageDTO uploadImage(MultipartFile file, String entityType, Long entityId, String imageType) {
        try {
            Image image = Image.builder()
                    .data(file.getBytes())
                    .fileName(file.getOriginalFilename())
                    .contentType(file.getContentType())
                    .entityType(EntityType.valueOf(entityType))
                    .entityId(entityId)
                    .type(ImageType.valueOf(imageType))
                    .uploadedAt(LocalDateTime.now())
                    .build();

            return mapToDTO(imageRepository.save(image));
        } catch (IOException ex) {
            throw new RuntimeException("Could not store image", ex);
        }
    }

    public Image getImage(Long id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));
    }

    public List<Image> getEntityImages(String entityType, Long entityId) {
        return imageRepository.findByEntityTypeAndEntityId(
                EntityType.valueOf(entityType),
                entityId
        );
    }

    @Transactional
    public void deleteImage(Long id) {
        if (!imageRepository.existsById(id)) {
            throw new RuntimeException("Image not found");
        }
        imageRepository.deleteById(id);
    }
}