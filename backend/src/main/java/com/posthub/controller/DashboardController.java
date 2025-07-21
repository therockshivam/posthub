package com.posthub.controller;

import com.posthub.service.MessageSourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/language")
@RequiredArgsConstructor
public class DashboardController extends AbstractBaseController {
    private final MessageSourceService messageSourceService;

    @GetMapping("/dashboard")
    public String dashboard(Model model, OAuth2AuthenticationToken authentication) {
        OAuth2User user = authentication.getPrincipal();
        model.addAttribute("name", user.getAttribute("name"));
        model.addAttribute("email", user.getAttribute("email"));
        return "dashboard";
    }

    @GetMapping( produces = "text/plain;charset=UTF-8")
    public ResponseEntity<String> dashboard() {
        System.out.println("Email code "+messageSourceService.get("email_verification"));
        return ResponseEntity.ok(messageSourceService.get("email_verification"));
    }
}
