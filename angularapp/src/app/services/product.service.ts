import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string='';

  constructor(private http:HttpClient) { }
  
  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getProductById(productId: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/api/products/${productId}`)
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/api/products`,product);
  }

  updateProduct(productId: number, product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/api/products/${productId}`,product);
  }

  deleteProduct(productId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/api/products/${productId}`);
  }
}
