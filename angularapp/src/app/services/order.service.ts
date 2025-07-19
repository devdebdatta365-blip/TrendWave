
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = 'https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080/api/orders';

  constructor(private http: HttpClient) { }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  placeOrder(order: Order): Observable<string> {
    return this.http.post(this.baseUrl, order, {
      headers: this.createAuthHeaders(),
      responseType: 'text' // Handle text response from backend
    });
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`, {
      headers: this.createAuthHeaders()
    });
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl, {
      headers: this.createAuthHeaders()
    });
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`, {
      headers: this.createAuthHeaders()
    });
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${orderId}`, order, {
      headers: this.createAuthHeaders()
    });
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}`, {
      headers: this.createAuthHeaders()
    });
  }
}