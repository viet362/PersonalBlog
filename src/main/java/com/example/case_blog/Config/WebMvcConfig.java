package com.example.case_blog.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Chuyển hướng khi người dùng truy cập trang chủ '/' về trang đăng nhập '/index.html'
        registry.addViewController("/").setViewName("forward:/index.html");
    }
}
