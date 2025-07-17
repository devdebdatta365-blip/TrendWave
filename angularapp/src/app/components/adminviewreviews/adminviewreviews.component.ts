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
  filteredReviews: Review[] = [];
  searchTerm: string = '';
  selectedRating: number = 0;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getAllReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.filteredReviews = reviews;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
      }
    });
  }

  filterReviews(): void {
    this.filteredReviews = this.reviews.filter(review => {
      const matchesSearch = this.searchTerm === '' || 
        review.reviewText.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.user.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRating = this.selectedRating === 0 || review.rating === this.selectedRating;
      
      return matchesSearch && matchesRating;
    });
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          this.reviews = this.reviews.filter(r => r.reviewId !== reviewId);
          this.filterReviews();
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
