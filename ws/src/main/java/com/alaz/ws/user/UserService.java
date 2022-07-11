package com.alaz.ws.user;

import com.alaz.ws.shared.FileService;
import com.alaz.ws.shared.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
public class UserService {
    UserRepository userRepository;
    FileService fileService;
    PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, FileService fileService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
    }

    public void save(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Page<User> getUsers(Pageable page, String username) {
        if(!username.isEmpty())
            return userRepository.findByUsernameNot(page, username);
        return userRepository.findAll(page);
    }

    public User getByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null) throw new NotFoundException();
        return user;
    }

    public User updateUserPassword(UserUpdateVM userUpdateVM, String username) {
        User user = getByUsername(username);
        String oldPassword = userUpdateVM.getOldPassword();
        String newPassword = userUpdateVM.getNewPassword();

        if(!oldPassword.isEmpty() && !newPassword.isEmpty()
                && passwordEncoder.matches(oldPassword, user.getPassword())){
            user.setPassword(newPassword);
            save(user);
            return user;
        }
        return null;
    }

    public User updateUserImage(UserUpdateVM userUpdateVM, String username) {
        User user = getByUsername(username);
        String newImage = userUpdateVM.getNewImage();

        if (newImage != null){
            String fileName =  fileService.writeBase64toFile(newImage);

            if (fileName != null){
                String oldImage = user.getImage();
                if(oldImage != null)
                    fileService.deleteFile(oldImage);

                user.setImage(fileName);
                userRepository.save(user);
                return user;
            }
        }
        return null;
    }
}
