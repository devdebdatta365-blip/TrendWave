import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
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

  // getAllProducts(): Observable<Product[]> {
  //   const dummyProducts: Product[] = [
  //     {
  //       productId: 1,
  //       productName: 'Wireless Mouse',
  //       description: 'Ergonomic wireless mouse with USB receiver',
  //       price: 799,
  //       stockQuantity: 25,
  //       category: 'Electronics',
  //       brand: 'LogiTech',
  //       coverImage: 'https://5.imimg.com/data5/YU/PV/MY-61397565/computer-mouse.jpg'
  //     },
  //     {
  //       productId: 2,
  //       productName: 'Bluetooth Headphones',
  //       description: 'Noise-cancelling over-ear headphones',
  //       price: 2499,
  //       stockQuantity: 15,
  //       category: 'Audio',
  //       brand: 'Sony',
  //       coverImage: 'https://media.istockphoto.com/id/1412240771/photo/headphones-on-white-background.jpg?s=612x612&w=0&k=20&c=DwpnlOcMzclX8zJDKOMSqcXdc1E7gyGYgfX5Xr753aQ='
  //     },
  //     {
  //       productId: 3,
  //       productName: 'Smart Watch',
  //       description: 'Fitness tracking smart watch with heart rate monitor',
  //       price: 3499,
  //       stockQuantity: 10,
  //       category: 'Wearables',
  //       brand: 'Fitbit',
  //       coverImage: 'https://imoostore.in/cdn/shop/files/Smart_Watch_for_Kids_-_imoo_Z1_Watchphone_Beauty_Shots.webp?v=1736400914&width=1024'
  //     }
  //   ];
  //   return of(dummyProducts);
  // }
}

