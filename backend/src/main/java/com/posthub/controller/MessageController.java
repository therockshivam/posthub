package com.posthub.controller;

import com.posthub.service.RedisMessagePublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/publish")
public class MessageController {

    @Autowired
    private RedisMessagePublisher publisher;

    @PostMapping
    public String sendMessage(@RequestParam String message) {
        publisher.publish("my-channel", message);
        return "Message published: " + message;
    }
}

