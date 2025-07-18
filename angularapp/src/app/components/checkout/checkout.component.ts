

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: OrderItem[] = [];
  totalAmount: number = 0;
  billingAddress: string = '';
  userId: number;
  loading = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cartItems.find(item => item.product.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.calculateTotal();
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCartItems();
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    if (!this.billingAddress.trim()) {
      alert('Please enter billing address!');
      return;
    }
  
    this.loading = true;
  
    const user: User = {
      userId: this.userId,
      email: '',
      password: '',
      username: '',
      mobileNumber: '',
      userRole: ''
    };
  
    // Make sure to match backend field names
    const order: Order = {
      orderDate: new Date().toISOString().split('T')[0],
      orderStatus: 'PENDING',
      shippingAddress: this.billingAddress,
      billingAddress: this.billingAddress,
      totalAmount: this.totalAmount,
      user: user,
      orderItems: this.cartItems.map(item => ({
        ...item,
        product: {
          ...item.product,
          // Convert frontend field names to backend field names
          descripion: item.product.descripion,
          stockInteger: item.product.stockInteger
        }
      }))
    };
  
    this.orderService.placeOrder(order).subscribe({
      next: (response: string) => {
        alert(response); // This will show "Order Placed Successfully!!"
        this.cartService.clearCart();
        this.cartItems = [];
        this.totalAmount = 0;
        this.billingAddress = '';
        this.loading = false;
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
        this.loading = false;
      }
    });
  }
  
}
