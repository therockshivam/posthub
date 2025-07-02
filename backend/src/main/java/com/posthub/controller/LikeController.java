package com.posthub.controller;

import com.posthub.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired private LikeService likeService;

    @PostMapping("/{mediaId}")
    public ResponseEntity<String> like(@PathVariable Long mediaId, Authentication auth) {
        return ResponseEntity.ok(likeService.likeMedia(mediaId, auth.getName()));
    }

    @DeleteMapping("/{mediaId}")
    public ResponseEntity<String> unlike(@PathVariable Long mediaId, Authentication auth) {
        return ResponseEntity.ok(likeService.unlikeMedia(mediaId, auth.getName()));
    }

    @GetMapping("/count/{mediaId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long mediaId) {
        return ResponseEntity.ok(likeService.getLikeCount(mediaId));
    }

    @GetMapping("/users/{mediaId}")
    public ResponseEntity<List<String>> getUsers(@PathVariable Long mediaId) {
        return ResponseEntity.ok(likeService.getLikedUsers(mediaId));
    }
}



