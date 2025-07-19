

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { Product } from '../../models/product.model';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserViewProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = [];
  sortBy: string = 'name';
  loading = false;

  // Modal properties
  showReviewModal = false;
  selectedProductReviews: Review[] = [];
  selectedProductName = '';
  loadingReviews = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    
    // Check for category filter from query params
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.filterProducts();
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.categories = [...new Set(products.map(p => p.category))];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = this.searchTerm === '' || 
        product.productName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === '' || 
        product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    this.sortProducts();
  }

  sortProducts(): void {
    this.filteredProducts.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.productName.localeCompare(b.productName);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert('Product added to cart!');
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }

  // New method to view reviews
  viewReviews(product: Product): void {
    this.selectedProductName = product.productName;
    this.showReviewModal = true;
    this.loadingReviews = true;
    
    this.reviewService.getReviewsByProductId(product.productId!).subscribe({
      next: (reviews) => {
        this.selectedProductReviews = reviews;
        this.loadingReviews = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.selectedProductReviews = [];
        this.loadingReviews = false;
      }
    });
  }

  // Method to close modal
  closeReviewModal(): void {
    this.showReviewModal = false;
    this.selectedProductReviews = [];
    this.selectedProductName = '';
  }

  // Method to generate star rating display
  getStarRating(rating: number): string {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return fullStars + emptyStars;
  }

  // Method to format date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  onSortChange(): void {
    this.sortProducts();
  }
}
