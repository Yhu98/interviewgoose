package com.yux.interviewgoose.satoken;

import cn.dev33.satoken.interceptor.SaInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Sa-Token Global Interceptor (to support permission annotations)
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/31
 */

@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    // Register Sa-Token interceptor to enable annotation-based authentication
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Register Sa-Token interceptor to enable annotation-based authentication
        registry.addInterceptor(new SaInterceptor()).addPathPatterns("/**");
    }
}