package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.User;

public interface UserRepo extends JpaRepository<User,Long>{

    boolean existsByEmail(String email);
    User findByEmail(String email);

    @Query("select u.userId from User u where u.email=:e")
    int findIdByEmail(@Param("e") String email);


    User findByEmailAndPassword(String email, String password);

    // @Query("select u.username from User u where u.email = ?1")
    // String findNameByEmail(String email);

}



