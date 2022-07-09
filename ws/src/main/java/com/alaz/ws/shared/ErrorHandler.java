package com.alaz.ws.shared;

import com.alaz.ws.user.UserController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ErrorHandler implements ErrorController {

    private static final Logger log = LoggerFactory.getLogger(ErrorHandler.class);

    @Autowired
    private ErrorAttributes errorAttributes;

    @RequestMapping("/error")
    public ResponseEntity<?> handleError(WebRequest webRequest){
        Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest, ErrorAttributeOptions.of(ErrorAttributeOptions.Include.MESSAGE, ErrorAttributeOptions.Include.BINDING_ERRORS));

        if (attributes.containsKey("errors")){
            // Signup errors
            List<FieldError> fieldErrors = (List<FieldError>) attributes.get("errors");
            Map<String, String> validationErrors = new HashMap<>();
            for (FieldError fieldError : fieldErrors)
                validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            log.info("400 Bad request");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(validationErrors);
        }
        else{
            // Login errors
            String message = (String) attributes.get("message");
            log.info("401 Unauthorized request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new GenericResponse(message));
        }
    }

    public String getErrorPath(){
        return "/error";
    }
}
