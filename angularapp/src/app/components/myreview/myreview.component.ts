import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyreviewComponent implements OnInit {
  reviews: Review[] = [];
  userId: number | null = null;
  selectedReview: Review | null = null;
  showProductModal = false;
  showDeleteModal = false;

  constructor(private reviewService: ReviewService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserId().subscribe(id => {
      this.userId = id;
      if (id) {
        this.reviewService.getReviewsByUserId(id).subscribe(reviews => this.reviews = reviews);
      }
    });
  }

  openProductModal(review: Review) {
    this.selectedReview = review;
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
    this.selectedReview = null;
  }

  confirmDelete(review: Review) {
    this.selectedReview = review;
    this.showDeleteModal = true;
  }

  deleteReview() {
    if (!this.selectedReview) return;
    this.reviewService.deleteReview(this.selectedReview.reviewId!).subscribe(() => {
      this.reviews = this.reviews.filter(r => r.reviewId !== this.selectedReview?.reviewId);
      this.showDeleteModal = false;
      this.selectedReview = null;
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.selectedReview = null;
  }
}
