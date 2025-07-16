package com.examly.springapp.controller;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.service.UserService;

import jakarta.jws.soap.SOAPBinding.Use;
import jakarta.validation.Valid;
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
       User createdUser = userService.createUser(user);
       if(createdUser != null){
        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
       }else{
        return new  ResponseEntity<>(HttpStatus.CONFLICT);
       }
    }

    // @PostMapping("/login")
    // public ResponseEntity<String> loginUser(@Valid @RequestBody LoginDTO loginDTO){
    //     String token = userService.loginUser(loginDTO);
    //     if(token!=null){
    //         return new ResponseEntity<>(token, HttpStatus.OK);
    //     }else{
    //         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    //     }

    //}

    
@PostMapping("/login")
public ResponseEntity<?> loginUser(@Valid @RequestBody LoginDTO loginDTO) {
    String token = userService.loginUser(loginDTO);
    User user = userService.getUserByEmail(loginDTO.getEmail()); // Add this method in UserService

    if (token != null && user != null) {
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userRole", user.getUserRole()); // Assuming getRole() returns "ADMIN" or "USER"
        response.put("userId", user.getUserId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

}
