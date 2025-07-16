package com.examly.springapp.controller;

import java.util.List;

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

@RestController
@CrossOrigin("*")
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

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        LoginDTO loginDTO = userService.loginUser(user);
        
        if(loginDTO!=null){
            return new ResponseEntity<>(loginDTO, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable long userId){
        User u = userService.getUserById(userId);
        if(u!= null){
            return new ResponseEntity<>(u, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getAllUser(){
        List<User> u = userService.getAllUser();
        if(!u.isEmpty()){
            return new ResponseEntity<>(u, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}