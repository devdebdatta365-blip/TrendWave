import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http : HttpClient) { }
  public apiUrl='';

  addReview(reviews:Review):Observable <Review >{
    return this.http.post<Review>(`${this.apiUrl}/api/reviews`,reviews);

  }
  
  getReviewById(reviewId: number): Observable<Review> {
       return this.http.get<Review>(`${this.apiUrl}/api/reviews/${reviewId}`);
   }
  
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews`);
   }
  
  getReviewsByUserId(userId: number): Observable<Review[]> {
     return this.http.get<Review[]>(`${this.apiUrl}/api/reviews/user/${userId}`);      
   }

   getReviewsByProductId(productId:number):Observable<Review[]>{
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews/product/${productId}`);

   }
  
   deleteReview(reviewId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/api/reviews/${reviewId}`);
     }
  


}
