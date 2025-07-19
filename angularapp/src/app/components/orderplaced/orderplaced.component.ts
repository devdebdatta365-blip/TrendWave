
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})
export class OrderplacedComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filteredOrders = orders;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesSearch = this.searchTerm === '' || 
        order.orderId?.toString().includes(this.searchTerm) ||
        order.user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.selectedStatus === '' || order.orderStatus === this.selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      const updatedOrder = { ...order, orderStatus: newStatus };
      this.orderService.updateOrder(orderId, updatedOrder).subscribe({
        next: (updated) => {
          const index = this.orders.findIndex(o => o.orderId === orderId);
          if (index !== -1) {
            this.orders[index] = updated;
            this.filterOrders();
          }
          alert('Order status updated successfully');
        },
        error: (error) => {
          console.error('Error updating order status:', error);
          alert('Error updating order status');
        }
      });
    }
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.orderId !== orderId);
          this.filterOrders();
          alert('Order deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting order:', error);
          alert('Error deleting order');
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
}
