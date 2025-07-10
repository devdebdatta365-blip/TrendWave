package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.exceptions.DuplicateProductException;
import com.examly.springapp.model.Product;
import com.examly.springapp.repository.ProductRepo;

public class ProductServiceImpl implements ProductService {
 
    @Autowired
	private ProductRepo productRepo;

	@Override
	public Product addProduct(Product product) {
        Optional<Product> prod=productRepo.findById(product.getProductId());
        if(prod.isPresent())
        {
            throw new DuplicateProductException("Product Already Present");
        }
		 return productRepo.save(product);
	}


	@Override
	public Optional<Product> getProductById(Long productId) {
		return productRepo.findById(productId);
	 }


	@Override
	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}

	@Override
	public Product updateProduct(Long productId, Product product) {
		Optional<Product> p=productRepo.findById(productId);
		Product oldProduct=null;
		if(p.isPresent()) {
        oldProduct=p.get();
		oldProduct.setProductName(product.getProductName());
		oldProduct.setDescripion(product.getDescripion());
		oldProduct.setPrice(product.getPrice());
		oldProduct.setStockInteger(product.getStockInteger());
		oldProduct.setCategory(product.getCategory());
		oldProduct.setBrand(product.getBrand());
		oldProduct.setCoverImage(product.getCoverImage());
		
		productRepo.save(oldProduct);
		return oldProduct;
		}
		return null;
	}

	@Override
	public boolean deleteProduct(Long productId) {
		Optional<Product> product= productRepo.findById(productId);
        if(product.isPresent()){
        	Product pp=product.get();
            productRepo.delete(pp);
            return true;
        }
        return false;
    }

}
