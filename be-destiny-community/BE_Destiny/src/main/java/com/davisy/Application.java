package com.davisy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.davisy.controller.ErrorControllerHandle;

@SpringBootApplication
@Configuration
public class Application {
//	9704198526191432198
	//https://console.firebase.google.com/u/1/project/davitickets-2e627/database/davitickets-2e627-default-rtdb/data/~2Flogin~2Fshield

	public static void main(String[] args) {
		
		SpringApplication.run(Application.class, args);
	}
//	@Bean
//	public ErrorControllerHandle errorControllerHandle() {
//		return new ErrorControllerHandle();
//	}

}
