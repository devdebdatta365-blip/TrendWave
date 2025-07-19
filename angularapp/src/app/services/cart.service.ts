
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../models/order-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: OrderItem[] = [];
  private cartSubject = new BehaviorSubject<OrderItem[]>([]);

  addToCart(product: Product, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.product.productId === product.productId);
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity, price: product.price });
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.productId !== productId);
    this.cartSubject.next(this.cartItems);
  }

  getCartItems(): OrderItem[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }
}

