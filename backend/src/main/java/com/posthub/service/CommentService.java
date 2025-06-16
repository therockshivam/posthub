package com.posthub.service;
import com.posthub.dto.request.comment.CommentRequestDTO;
import com.posthub.entity.Comment;
import java.util.List;

public interface CommentService {
    Comment createComment(CommentRequestDTO dto, Long userId);
    List<Comment> getCommentsByPost(Long postId);

}
