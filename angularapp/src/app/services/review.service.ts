

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  public apiUrl = 'https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080';

  constructor(private http: HttpClient) { }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addReview(reviews: Review): Observable<string> {
    return this.http.post(`${this.apiUrl}/api/reviews`, reviews, {
      headers: this.createAuthHeaders(),
      responseType: 'text'
    });
  }
  
  getReviewById(reviewId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/api/reviews/${reviewId}`, {
      headers: this.createAuthHeaders()
    });
  }
  
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews`, {
      headers: this.createAuthHeaders()
    });
  }
  
  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews/user/${userId}`, {
      headers: this.createAuthHeaders()
    });
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews/product/${productId}`, {
      headers: this.createAuthHeaders()
    });
  }
  
  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/reviews/${reviewId}`, {
      headers: this.createAuthHeaders()
    });
  }
}

