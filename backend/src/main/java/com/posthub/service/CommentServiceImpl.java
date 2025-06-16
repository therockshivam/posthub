package com.posthub.service;

import com.posthub.dto.request.comment.CommentRequestDTO;
import com.posthub.entity.Comment;
import com.posthub.entity.Post;
import com.posthub.repository.CommentRepository;
import com.posthub.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Override
    public Comment createComment(CommentRequestDTO dto, Long userId) {
        Post post = postRepository.findById(dto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setUserId(userId);
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // Get comments by post ID
    public List<Comment> getCommentsByPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}

