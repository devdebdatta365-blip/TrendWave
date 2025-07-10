package com.examly.springapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="product_id")
	private long productId;
	@Column(name="product_name")
	private String productName;
	@Column(name="description")
	private String descripion;
	@Column(name="price")
	private double price;
	public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getDescripion() {
		return descripion;
	}
	public void setDescripion(String descripion) {
		this.descripion = descripion;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getStockInteger() {
		return stockInteger;
	}
	public void setStockInteger(int stockInteger) {
		this.stockInteger = stockInteger;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getCoverImage() {
		return coverImage;
	}
	public void setCoverImage(String coverImage) {
		this.coverImage = coverImage;
	}
	@Column(name="stock_integer")
	private int stockInteger;
	@Column(name="category")
	private String category;
	@Column(name="brand")
	private String brand;
	@Column(name="cover_image")
	private String  coverImage;

}
