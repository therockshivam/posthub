package com.posthub.dto.model;

import com.posthub.controller.Media;
import com.posthub.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "likes", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "media_id"}))
public class LikeDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = false)
    private Media media;

    private LocalDateTime likedAt = LocalDateTime.now();
}
