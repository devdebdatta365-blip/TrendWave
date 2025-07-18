
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = 'https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080';

  constructor(private http: HttpClient) { }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Debug log
    
    if (!token) {
      console.error('No token found in localStorage');
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  getAllProducts(): Observable<Product[]> {
    console.log('Making GET request to:', `${this.baseUrl}/api/products`);
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`, {
      headers: this.createAuthHeaders()
    });
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/api/products/${productId}`, {
      headers: this.createAuthHeaders()
    });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/api/products`, product, {
      headers: this.createAuthHeaders()
    });
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/api/products/${productId}`, product, {
      headers: this.createAuthHeaders()
    });
  }

  deleteProduct(productId: number): Observable<void> {
    console.log('Making DELETE request to:', `${this.baseUrl}/api/products/${productId}`);
    const headers = this.createAuthHeaders();
    console.log('Headers:', headers);
    
    return this.http.delete<void>(`${this.baseUrl}/api/products/${productId}`, {
      headers: headers
    });
  }
}


