package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Review;
import com.examly.springapp.repository.ReviewRepo;

@Service
public class ReviewServiceImpl implements ReviewService{
    @Autowired
	private ReviewRepo reviewRepo;
	
	@Override
	public Review addReview(Review review) {
		review.setDate(LocalDate.now());
		return reviewRepo.save(review);
		
	}

	@Override
	public Optional<Review> getReviewById(Long reviewId) {
		Optional<Review> rev=reviewRepo.findById(reviewId);
		if(rev.isPresent()){
            return rev;
        }
            return null;
	}

	@Override
	public List<Review> getAllReviews() {
		return reviewRepo.findAll();
	}

	@Override
	public List<Review> getReviewsByUserId(Long userId) {
		return reviewRepo.findByUserUserId(userId);
	}

	@Override
	public List<Review> getReviewsByProductId(Long productId) {
		return reviewRepo.findByProductProductId(productId);
	}

	@Override
	public boolean deleteReview(Long reviewId) {
		if(reviewRepo.existsById(reviewId)) {
			reviewRepo.deleteById(reviewId);
			return true;
		}
		return false;
	}
    
}
