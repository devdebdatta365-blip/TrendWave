package com.examly.springapp.model;

public class LoginDTO {

    private String email;
    // private String password;
    private String userRole;
    private String token;

    public LoginDTO() {
    }

    public LoginDTO(String token,String email, String userRole) {
        this.token=token;
        this.email = email;
        this.userRole = userRole;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    

    
    

}
