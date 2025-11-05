package com.corrigeai.api; // Este é o seu pacote principal

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // A anotação mais importante!
public class ApiApplication {

    public static void main(String[] args) {
        // Esta linha é que "liga" o Spring Boot
        SpringApplication.run(ApiApplication.class, args);
    }

}