import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { OrderItem } from '../models/order-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  baseUrl:string='';
  // addToCart(product:Product,quantity:number):void
  // {
  //   this.http.post<void>(`${this.baseUrl}`,product);
  // }
  // removeFromCart(productId: number): void
  // {
  //   this.http.delete<void>(`${this.baseUrl}/api/orders/${productId}`);
  // }
  // getCartItems():Observable<OrderItem[]>
  // {
  //   return this.http.get<OrderItem[]>(`${this.baseUrl}/api/orders`);
  // }
  clearCart()
  {
    
  }

}
