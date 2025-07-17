import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string='https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080';

  constructor(private http:HttpClient) { }
  
  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getProductById(productId: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/api/products/${productId}`)
  }

  // addProduct(product: FormData): Observable<Product>{
  //   return this.http.post<Product>(`${this.baseUrl}/api/products`,product);
  // }
  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/products`, formData);
  }
  
  

  // updateProduct(productId: number, product: Product): Observable<Product>{
  //   return this.http.put<Product>(`${this.baseUrl}/api/products/${productId}`,product);
  // }
  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http.put(`/api/products/${productId}`, formData);
  }
  

  deleteProduct(productId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/api/products/${productId}`);
  }
}
