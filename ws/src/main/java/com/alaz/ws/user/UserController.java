package com.alaz.ws.user;

import com.alaz.ws.shared.CurrentUser;
import com.alaz.ws.shared.GenericResponse;
import com.alaz.ws.shared.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
    UserService userService;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @PostMapping("/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        log.info("User created: " + user.toString());
        userService.save(user);
        return ResponseEntity.ok(new GenericResponse("User created."));
    }

    @GetMapping("/users")
    public Page<User> getUsers(Pageable page, @RequestParam String username){
        return userService.getUsers(page, username);
    }

    @GetMapping("/users/{username}")
    public User getUser(@PathVariable String username){
        return userService.getByUsername(username);
    }

    @PutMapping("/users/{username}/password")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody UserUpdateVM userUpdateVM, @PathVariable String username){
        User user = userService.updateUserPassword(userUpdateVM, username);

        if(user == null)
            return ResponseEntity.badRequest().body(new GenericResponse("Couldn't update the password."));

        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{username}/image")
    public ResponseEntity<?> updateUserImage(@Valid @RequestBody UserUpdateVM userUpdateVM, @PathVariable String username, @CurrentUser User loggedInUser){
        User user = userService.updateUserImage(userUpdateVM, username);

        if(user == null)
            return ResponseEntity.badRequest().body(new GenericResponse("Couldn't update the profile image."));

        return ResponseEntity.ok(user);
    }

}
