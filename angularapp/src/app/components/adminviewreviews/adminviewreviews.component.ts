import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-adminviewreviews',
  templateUrl: './adminviewreviews.component.html',
  styleUrls: ['./adminviewreviews.component.css']
})
export class AdminviewreviewsComponent implements OnInit {

  reviews: Review[] = []; //All reviews fetched from the backend
  filteredReviews: Review[] = []; //Reviews after applying search and filters
  searchTerm: string = ''; //Text used to filter reviews by product name
  currentPage: number = 1;
  pageSize: number = 5;
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private reviewService: ReviewService) { }

  //Fetches all reviews and apply filters
  //Handles errors by setting reviews to empty array
  ngOnInit(): void {
    this.reviewService.getAllReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        this.applyFilters();
      },
      error: () => {
        this.reviews = [];
      }
    });
  }


  //Filters reviews by product name
  //Sorts them by date based on sort direction
  applyFilters(): void {
    let filtered = this.reviews;

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(review =>
        review.product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    this.filteredReviews = filtered;
  }
  

  //Updates the current page
  //Returns the reviews of the current page
  changePage(page: number): void {
    this.currentPage = page;
  }

  get paginatedReviews(): Review[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredReviews.slice(start, start + this.pageSize);
  }


  //Switches between ascending and descending order
  toggleSort(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }


}
