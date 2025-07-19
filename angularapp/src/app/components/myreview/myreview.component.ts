

import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { Review } from '../../models/review.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyReviewComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;
  userId: number;
  showAddForm = false;
  error: string | null = null;
  
  newReview: Review = {
    reviewText: '',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    user: {
      userId: 0,
      email: '',
      password: '',
      username: '',
      mobileNumber: '',
      userRole: 'USER'
    },
    product: {
      productId: 0,
      productName: '',
      descripion: '',
      price: 0,
      stockInteger: 0,
      category: '',
      brand: '',
      coverImage: ''
    }
  };

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    // Check if user is logged in and has valid ID
    if (!this.authService.isLoggedIn() || this.userId === 0) {
      this.error = 'User not authenticated. Please login again.';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      return;
    }
    this.loadMyReviews();
  }

  loadMyReviews(): void {
    this.loading = true;
    this.error = null;
    
    console.log('Loading reviews for user ID:', this.userId);
    
    this.reviewService.getReviewsByUserId(this.userId).subscribe({
      next: (reviews) => {
        this.reviews = reviews.filter(review => 
          review.reviewText && 
          review.rating !== null && 
          review.rating !== undefined
        );
        this.loading = false;
        console.log('Loaded reviews:', this.reviews);
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        
        switch (error.status) {
          case 401:
            this.error = 'Session expired. Please login again.';
            setTimeout(() => {
              this.authService.logout();
            }, 2000);
            break;
            
          case 404:
            // Handle 404 - user has no reviews (normal case)
            this.reviews = [];
            this.error = null;
            console.log('No reviews found for user ID:', this.userId);
            break;
            
          case 403:
            this.error = 'Access denied. You do not have permission to view reviews.';
            break;
            
          case 500:
            this.error = 'Server error. Please try again later.';
            break;
            
          default:
            this.error = 'Failed to load reviews. Please try again.';
            break;
        }
        this.loading = false;
      }
    });
  }

  openAddForm(): void {
    this.showAddForm = true;
    this.resetForm();
  }

  closeAddForm(): void {
    this.showAddForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newReview = {
      reviewText: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      user: {
        userId: this.userId,
        email: '',
        password: '',
        username: '',
        mobileNumber: '',
        userRole: 'USER'
      },
      product: {
        productId: 1, // Default product ID - user will need to change this
        productName: '',
        descripion: '',
        price: 0,
        stockInteger: 0,
        category: '',
        brand: '',
        coverImage: ''
      }
    };
  }

  addReview(): void {
    if (!this.newReview.reviewText.trim()) {
      alert('Please enter a review text');
      return;
    }

    if (this.newReview.product.productId <= 0) {
      alert('Please enter a valid product ID');
      return;
    }

    this.newReview.user.userId = this.userId;
    this.newReview.date = new Date().toISOString().split('T')[0];

    this.reviewService.addReview(this.newReview).subscribe({
      next: (response) => {
        console.log('Review added:', response);
        this.closeAddForm();
        this.loadMyReviews();
        alert('Review added successfully!');
      },
      error: (error) => {
        console.error('Error adding review:', error);
        
        if (error.status === 401) {
          alert('Session expired. Please login again.');
          this.authService.logout();
        } else if (error.status === 400) {
          alert('Invalid review data. Please check your input.');
        } else {
          alert('Error adding review. Please try again.');
        }
      }
    });
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          this.reviews = this.reviews.filter(r => r.reviewId !== reviewId);
          alert('Review deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting review:', error);
          
          if (error.status === 401) {
            alert('Session expired. Please login again.');
            this.authService.logout();
          } else if (error.status === 403) {
            alert('You do not have permission to delete this review.');
          } else {
            alert('Error deleting review. Please try again.');
          }
        }
      });
    }
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < rating);
  }

  refreshReviews(): void {
    this.loadMyReviews();
  }
}
