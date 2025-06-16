package com.posthub.service;
import com.posthub.entity.Post;
import java.util.List;
import com.posthub.dto.request.post.PostRequestDTO;

public interface PostService {
    Post createPost(PostRequestDTO dto, Long userId);
    List<Post> getAllPosts();
    Post getPostById(Long id);
    void deletePost(Long id);
}
