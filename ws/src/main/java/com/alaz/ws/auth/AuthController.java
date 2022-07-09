package com.alaz.ws.auth;

import com.alaz.ws.shared.CurrentUser;
import com.alaz.ws.user.User;
import com.alaz.ws.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    UserRepository userRepository;

    @PostMapping("/api/v1/auth")
    public ResponseEntity<?> handleAuth(@CurrentUser User user) {
        log.info("User logged in: " + user);
        return ResponseEntity.ok(user);
    }
}
