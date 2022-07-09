package com.alaz.ws.user;

import com.alaz.ws.shared.CurrentUser;
import com.alaz.ws.shared.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @PostMapping("/api/v1/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        log.info("User created: " + user.toString());
        userService.save(user);
        return ResponseEntity.ok(new GenericResponse("User created."));
    }

    @GetMapping("/api/v1/users")
    public Page<User> getUsers(Pageable page, @RequestParam String username){
        return userService.getUsers(page, username);
    }
}
