package com.davisy.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.davisy.service.impl.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
/* @RequiredArgsConstructor */

@EnableGlobalMethodSecurity(prePostEnabled = false, securedEnabled = false, jsr250Enabled = true)
public class SecurityConfig {

	@Autowired
	JwtAuthFilter authFilter;

	@Autowired
	JwtAuthEntryPoint authEntryPoint;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// private final AuthenticationManager authenticationManager;

	/*
	 * @Override protected void configure(HttpSecurity http) throws Exception {
	 * 
	 * 
	 * http.csrf().disable().cors().disable(); http.exceptionHandling()
	 * .authenticationEntryPoint(authEntryPoint) .and() .sessionManagement()
	 * .sessionCreationPolicy(SessionCreationPolicy.STATELESS) .and()
	 * .authenticationProvider(authenticationProvider())
	 * .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class); }
	 */

	@Autowired(required = true)
	private UserDetailsServiceImpl userDetailsService;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecure) throws Exception {// Disable csrf
		httpSecure.csrf().disable().cors().disable()
				.oauth2Login(oauth2Login -> oauth2Login.loginPage("/oauth2/authorization/facebook")
						.defaultSuccessUrl("/user-home") // URL mặc định sau đăng nhập
															// thành công
				
				)
//				.exceptionHandling().authenticationEntryPoint(authEntryPoint).and().sessionManagement()
//				.sessionCreationPolicy(SessionCreationPolicy.ALWAYS).and()
//				.authenticationProvider(authenticationProvider())
//				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
				;

		return httpSecure.build();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public CsrfTokenRepository csrfTokenRepository() {
		CookieCsrfTokenRepository repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
		repository.setCookieName("XSRF-TOKEN");
		return repository;
	}

}