package com.davisy.oauth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig_Oauth {
	 @Bean
	    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
	        http
	        .authorizeRequests(authorizeRequests ->
            authorizeRequests
                .requestMatchers("/user-home").authenticated() // Trang bạn muốn bảo vệ
                .anyRequest().permitAll() // Các trang khác có thể truy cập mà không cần đăng nhập
        )
	            .oauth2Login(oauth2Login ->
	                oauth2Login
	                    .defaultSuccessUrl("/user-home") // URL mặc định sau đăng nhập thành công
	            )
	            .logout(logout ->
	                logout
	                    .logoutSuccessUrl("/") // URL sau khi đăng xuất
	            );

	        return http.build();
	    }

    @Bean
    public CsrfTokenRepository csrfTokenRepository() {
        CookieCsrfTokenRepository repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        repository.setCookieName("XSRF-TOKEN");
        return repository;
    }
}
