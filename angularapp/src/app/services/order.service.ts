import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  baseUrl:string='';

  placeOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(this.baseUrl, order);
  } 

  getOrderById(orderId:number):Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`)
  }

  getAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrdersByUserId(userId:number):Observable<Order[]>{
    return this.http.get<Order[]>(this.baseUrl);
  }

  updateOrder(orderId:number, order:Order):Observable<Order>{
    return this.http.put<Order>(`${this.baseUrl}/${orderId}`, order);
  }

  deleteOrder(orderId:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${orderId}`);
  }
}
