package com.posthub.controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/dashboard")
    public String dashboard(Model model, OAuth2AuthenticationToken token) {
        OAuth2User user = token.getPrincipal();
        model.addAttribute("name", user.getAttribute("name"));
        model.addAttribute("email", user.getAttribute("email"));
        return "dashboard"; // return your dashboard view
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // custom login page
    }
}
