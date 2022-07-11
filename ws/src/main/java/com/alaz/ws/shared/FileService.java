package com.alaz.ws.shared;

import com.alaz.ws.user.UserRepository;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileService {

    Tika tika;

    public FileService() {
        this.tika = new Tika();
    }

    public String writeBase64toFile (String image) {
        String filename = generateRandomName();
        File target = new File("storage/" + filename);

        OutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(target);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        byte[] decoded = Base64.getDecoder().decode(image);

        String fileType = tika.detect(decoded);

        if (fileType.equalsIgnoreCase("image/png") ||
                fileType.equalsIgnoreCase("image/jpg") ||
                fileType.equalsIgnoreCase("image/jpeg")){
            try {
                outputStream.write(decoded);
                outputStream.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return filename;
        }
        return null;
    }

    public String generateRandomName(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public void deleteFile(String filename){
        if(filename != null){
            try {
                Files.deleteIfExists(Paths.get("storage/", filename));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
