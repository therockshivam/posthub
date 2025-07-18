package com.posthub.config;

import com.posthub.service.InterceptorService;
import com.posthub.service.LanguageInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Profile("!mvcIT")
public class WebMvcConfig implements WebMvcConfigurer {
    private final String swaggerUiPath;

    private final InterceptorService interceptorService;

    private final LanguageInterceptor languageInterceptor;

    public WebMvcConfig(
        @Value("${springdoc.swagger-ui.path}") String swaggerUiPath,
        final InterceptorService interceptorService,
        final LanguageInterceptor languageInterceptor
    ) {
        this.swaggerUiPath = swaggerUiPath;
        this.interceptorService = interceptorService;
        this.languageInterceptor = languageInterceptor;
    }

    @Override
    public final void addViewControllers(final ViewControllerRegistry registry) {
        registry.addRedirectViewController("/", swaggerUiPath);
    }

    @Override
    public final void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .exposedHeaders("*")
            .allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE");
    }

    /**
     * Add Spring MVC lifecycle interceptors for pre- and post-processing of controller method invocations
     * and resource handler requests.
     *
     * @param registry -- List of mapped interceptors.
     */
    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(interceptorService).addPathPatterns("/v1/**");
        registry.addInterceptor(languageInterceptor).addPathPatterns("/**");
    }
}
