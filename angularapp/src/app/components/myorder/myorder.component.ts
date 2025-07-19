

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyOrderComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  userId: number;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadMyOrders();
  }

  loadMyOrders(): void {
    this.loading = true;
    this.orderService.getOrdersByUserId(this.userId).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.loading = false;
      }
    });
  }

  cancelOrder(orderId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.orderId !== orderId);
          alert('Order cancelled successfully');
        },
        error: (error) => {
          console.error('Error cancelling order:', error);
          this.loadMyOrders();
          // alert('Error cancelling order');
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }

  canCancelOrder(order: Order): boolean {
    return order.orderStatus.toLowerCase() === 'pending' || 
           order.orderStatus.toLowerCase() === 'processing';
  }
}

