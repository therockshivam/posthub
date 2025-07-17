package com.posthub.controller;

import com.posthub.service.MessageSourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController extends AbstractBaseController {
    private final MessageSourceService messageSourceService;

    @GetMapping
    public ResponseEntity<String> dashboard() {
        System.out.println("Email code "+messageSourceService.get("email_verification"));
        return ResponseEntity.ok(messageSourceService.get("email_verification"));
    }
}
