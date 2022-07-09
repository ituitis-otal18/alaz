package com.alaz.ws;

import com.alaz.ws.user.User;
import com.alaz.ws.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WsApplication {

    private static final Logger log = LoggerFactory.getLogger(WsApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(WsApplication.class, args);
        log.info("APPLICATION STARTED");
    }

    @Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        return (args) -> {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@mail");
            admin.setPassword("123123");
            userService.save(admin);
            log.info("ADMIN: " + admin.toString());

            for (int i=0; i<30; i++){
                User user = new User();
                user.setUsername("user"+i);
                user.setEmail("user@mail"+i);
                user.setPassword("123123");
                userService.save(user);
            }
        };
    }

}
