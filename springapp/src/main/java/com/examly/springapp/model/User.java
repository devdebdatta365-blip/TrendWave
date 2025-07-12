package com.examly.springapp.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="user_id")
	private Long userId;

	@NotNull(message = "Email is required")
	@Column(name="email")
	private String email;
	@Column(name="password")
	private String password;
	@Column(name="username")
	private String userName;
	@Column(name="mobile_number")
	private String mobileNumber;
	@Column(name = "user_role")
	private String userRole;
	// @OneToMany(mappedBy = "user",cascade=CascadeType.ALL)
	//  @JsonManagedReference
	// private List<Order> orders;
	// @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	//  @JsonManagedReference
	// private List<Review> reviews;
}
