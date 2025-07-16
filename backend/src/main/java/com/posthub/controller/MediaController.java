package com.posthub.controller;

import com.posthub.service.MediaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Tag(name = "Media", description = "Media management APIs")
@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    @Operation(summary = "Upload a media file", description = "Uploads a media file with title and description")
    @PostMapping
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description
    ) throws IOException {
        return ResponseEntity.ok(mediaService.saveMedia(file, title, description));
    }

    @Operation(summary = "Get all media", description = "Retrieves a list of all media files")
    @GetMapping
    public ResponseEntity<List<Media>> getAll() {
        return ResponseEntity.ok(mediaService.getAllMedia());
    }

    @Operation(summary = "Get media by ID", description = "Retrieves a media file by its ID")
    @GetMapping("/{id}")
    public ResponseEntity<Media> getById(@PathVariable Long id) {
        return ResponseEntity.ok(mediaService.getMediaById(id));
    }

    @Operation(summary = "Update media", description = "Updates the title and description of a media file by its ID")
    @PutMapping("/{id}")
    public ResponseEntity<Media> update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String description
    ) {
        return ResponseEntity.ok(mediaService.updateMedia(id, title, description));
    }

    @Operation(summary = "Delete media", description = "Deletes a media file by its ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        mediaService.deleteMedia(id);
        return ResponseEntity.ok("Deleted Successfully");
    }

    @Operation(summary = "Download media", description = "Downloads a media file by its ID")
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable Long id) throws IOException {
        Resource file = mediaService.loadFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @Operation(summary = "View media", description = "Streams a media file by its ID")
    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewMedia(@PathVariable Long id) throws IOException {
        Resource file = mediaService.loadFile(id);
        Media media = mediaService.getMediaById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(media.getFileType()))
                .body(file);
    }

}
