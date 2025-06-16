package com.posthub.dto.request.post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequestDTO {
    private String title;
    private String content;
    private String imageUrl;
}
