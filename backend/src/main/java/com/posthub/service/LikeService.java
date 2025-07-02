package com.posthub.service;

import com.posthub.controller.Media;
import com.posthub.entity.Like;
import com.posthub.entity.User;
import com.posthub.repository.LikeRepository;
import com.posthub.repository.MediaRepository;
import com.posthub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;
    @Autowired private MediaRepository mediaRepository;
    @Autowired private UserRepository userRepository;

    public String likeMedia(Long mediaId, String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Media media = mediaRepository.findById(mediaId).orElseThrow();

        if (likeRepository.findByUserAndMedia(user, media).isPresent()) {
            return "Already liked.";
        }

        Like like = new Like();
        like.setUser(user);
        like.setMedia(media);
        likeRepository.save(like);

        return "Liked!";
    }

    public String unlikeMedia(Long mediaId, String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Media media = mediaRepository.findById(mediaId).orElseThrow();

        return likeRepository.findByUserAndMedia(user, media)
                .map(existing -> {
                    likeRepository.delete(existing);
                    return "Unliked!";
                }).orElse("Not previously liked.");
    }

    public long getLikeCount(Long mediaId) {
        Media media = mediaRepository.findById(mediaId).orElseThrow();
        return likeRepository.countByMedia(media);
    }

    public List<String> getLikedUsers(Long mediaId) {
        Media media = mediaRepository.findById(mediaId).orElseThrow();
        return likeRepository.findAllByMedia(media)
                .stream()
                .map(like -> like.getUser().getUsername())
                .toList();
    }
}
