package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long>{
    
}
