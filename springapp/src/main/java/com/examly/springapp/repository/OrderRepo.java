package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long>{
<<<<<<< HEAD
    @Query("Select p from Order p where p.user.userId=?1")
=======

    @Query("select p from Order p where p.user.userId=?1")
>>>>>>> 515a50307a2868087cc1dc06e5b4945ffd95763c
    List<Order> getOrderList(long userId);
    
}
