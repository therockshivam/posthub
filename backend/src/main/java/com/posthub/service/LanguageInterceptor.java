package com.posthub.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Locale;

@Component
public class LanguageInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String lang = request.getHeader("X-Language"); // or Accept-Language or query param
        if (lang == null) {
            lang = "en"; // default
        }
        LocaleContextHolder.setLocale(Locale.forLanguageTag(lang));
        return true;
    }
}

