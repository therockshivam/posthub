package com.posthub.repository;

import com.posthub.controller.Media;
import com.posthub.entity.Like;
import com.posthub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserAndMedia(User user, Media media);

    List<Like> findAllByMedia(Media media);

    long countByMedia(Media media);
}
