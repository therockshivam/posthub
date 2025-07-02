package com.posthub.entity;

import com.posthub.controller.Media;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "likes", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "media_id"}))
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Media media;

    private LocalDateTime likedAt = LocalDateTime.now();
}
