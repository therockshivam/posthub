package com.posthub.controller;
import com.posthub.dto.request.comment.CommentRequestDTO;
import com.posthub.entity.Comment;
import com.posthub.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    @Autowired
    private  CommentService commentService;

    // POST /api/comments
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequestDTO dto) {
        Long userId = 1L; // Replace with actual logic from security
        Comment created = commentService.createComment(dto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // GET /api/comments/post/{postId}
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }
}
