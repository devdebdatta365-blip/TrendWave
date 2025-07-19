
import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-adminviewreviews',
  templateUrl: './adminviewreviews.component.html',
  styleUrls: ['./adminviewreviews.component.css']
})
export class AdminViewReviewsComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;
  error: string | null = null;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.loading = true;
    this.error = null;
    
    this.reviewService.getAllReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews.filter(review => 
          review.reviewText && 
          review.rating !== null && 
          review.rating !== undefined &&
          review.user
        );
        
        this.loading = false;
        console.log('Loaded reviews:', this.reviews);
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.error = 'Failed to load reviews. Please try again.';
        this.loading = false;
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
          alert('Error deleting review');
        }
      });
    }
  }
}

