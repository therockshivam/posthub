package com.posthub.service;

import com.posthub.controller.Media;
import com.posthub.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class MediaService {

    @Value("${media.upload-dir}")
    private String uploadDir;

    @Autowired
    private MediaRepository mediaRepository;

 /*   public Media saveMedia(MultipartFile file, String title, String description) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir, fileName);
        Files.write(path, file.getBytes());

        Media media = new Media();
        media.setFileName(fileName);
        media.setFileType(file.getContentType());
        media.setTitle(title);
        media.setDescription(description);
        media.setFilePath(path.toString());

        return mediaRepository.save(media);
    }*/

    public Media saveMedia(MultipartFile file, String title, String description) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Media media = new Media();
        media.setFileName(fileName);
        media.setFileType(file.getContentType());
        media.setTitle(title);
        media.setDescription(description);
        media.setFileData(file.getBytes());

        return mediaRepository.save(media);
    }

    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }

    public Media getMediaById(Long id) {
        return mediaRepository.findById(id).orElseThrow(() -> new RuntimeException("Not Found"));
    }

    public Media updateMedia(Long id, String title, String description) {
        Media media = getMediaById(id);
        media.setTitle(title);
        media.setDescription(description);
        return mediaRepository.save(media);
    }

    public void deleteMedia(Long id) {
        Media media = getMediaById(id);
        try {
            Files.deleteIfExists(Paths.get(media.getFilePath()));
        } catch (IOException e) {
            throw new RuntimeException("File deletion failed");
        }
        mediaRepository.deleteById(id);
    }

    public Resource loadFile(Long id) throws IOException {
        Media media = getMediaById(id);
        return new ByteArrayResource(media.getFileData());
    }
}

