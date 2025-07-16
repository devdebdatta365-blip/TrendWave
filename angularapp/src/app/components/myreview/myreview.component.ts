import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyReviewComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;
  userId: number;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadMyReviews();
  }

  loadMyReviews(): void {
    this.loading = true;
    this.reviewService.getReviewsByUserId(this.userId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
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

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < rating);
  }
}
