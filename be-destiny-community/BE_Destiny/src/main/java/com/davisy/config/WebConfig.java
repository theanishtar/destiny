//package com.davisy.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//    	registry.addMapping("/v1/**")
//        .allowedOrigins("http://localhost:4200") // Thêm các origin mà bạn muốn chấp nhận
//        .allowedMethods("GET", "POST", "PUT", "DELETE")
//        .allowCredentials(true);
//    }
//}