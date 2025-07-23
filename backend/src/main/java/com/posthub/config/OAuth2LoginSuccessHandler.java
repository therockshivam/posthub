package com.posthub.config;

import com.posthub.dto.request.auth.RegisterRequest;
import com.posthub.dto.response.auth.TokenResponse;
import com.posthub.entity.User;
import com.posthub.security.JwtTokenProvider;
import com.posthub.service.AuthService;
import com.posthub.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindException;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    Logger logger = LoggerFactory.getLogger(OAuth2LoginSuccessHandler.class);

    private final JwtTokenProvider tokenProvider;

    private final UserService userService;

    private final AuthService authService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        logger.info("OAuth2 authentication successful for user: {}", oAuth2User);
        String email = oAuth2User.getAttribute("email");
        String baseUrl = request.getRequestURL().toString().replace(request.getServletPath(), "");

        logger.info("OAuth2 authentication successful for user: {}", email);
        logger.info("Base url is : {}", baseUrl);

        // Check if email is present
        if(email == null || email.isEmpty()) {
            logger.error("Email not found in OAuth2 user attributes");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Email not found in OAuth2 user attributes");
            return;
        }
        // Check if user already exists in DB
        User user = userService.findByEmail(email);
        if(user == null) {
            logger.info("User not found in DB, creating new user: {}", email);
            // You can register user in DB if not exists
            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.setEmail(email);
            registerRequest.setName(oAuth2User.getAttribute("name"));
            registerRequest.setUsername(oAuth2User.getAttribute("given"));
            registerRequest.setPassword(UUID.randomUUID().toString()); // Random password for OAuth2 users
            try {
                userService.register(registerRequest);
            } catch (BindException e) {
                logger.error("Error registering user: {}", e.getMessage());
                throw new RuntimeException(e);
            }

            logger.info("New user created in DB: {}", email);
        } else {
            logger.info("User found in DB: {}", email);
        }

        User foundUser = userService.findByEmail(email);

        // Generate JWT token for the user
        TokenResponse token = authService.generateTokens(foundUser.getId(), false);

        // Send the JWT token to frontend
        response.sendRedirect(baseUrl+"/login/success?token=" + token.getToken()+
                "&refreshToken=" + token.getRefreshToken() +
                "&expiresIn=" + token.getExpiresIn());
    }
}
