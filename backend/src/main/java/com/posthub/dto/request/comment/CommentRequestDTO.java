package com.posthub.dto.request.comment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDTO {
    private String content;
    private Long postId;
}

