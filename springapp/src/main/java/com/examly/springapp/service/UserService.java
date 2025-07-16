package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;

public interface UserService {

    User createUser(User user);
    LoginDTO loginUser(User user);
    public abstract User getUserById(long userId);
    public abstract List<User> getAllUser();
}
