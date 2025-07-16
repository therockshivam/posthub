package com.posthub.controller;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String title;
    private String description;
    private String filePath;

    @Lob
    @Column(name = "file_data")
    private byte[] fileData;

    private LocalDateTime uploadedAt = LocalDateTime.now();

}
