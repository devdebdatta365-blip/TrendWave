
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  showSuccess = false;
  productId: number;
  productName: string = '';

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.productService.getProductById(this.productId).subscribe(product => {
      this.productName = product.productName;
    });
    this.reviewForm = this.fb.group({
      reviewText: ['', Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;
    const review = {
      ...this.reviewForm.value,
      product: { productId: this.productId }
    };
    this.reviewService.addReview(review).subscribe(() => {
      this.showSuccess = true;
      setTimeout(() => this.router.navigate(['/userviewproduct']), 1500);
    });
  }
}

