
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems = [];
  totalAmount = 0;
  showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.checkoutForm = this.fb.group({
      shippingAddress: ['', Validators.required],
      billingAddress: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;
    const order = {
      orderDate: new Date().toISOString(),
      orderStatus: 'Pending',
      shippingAddress: this.checkoutForm.value.shippingAddress,
      billingAddress: this.checkoutForm.value.billingAddress,
      totalAmount: this.totalAmount,
      user:this.checkoutForm.value.user,
      orderItems: this.cartItems
    };
    this.orderService.placeOrder(order).subscribe(() => {
      this.showSuccess = true;
      this.cartService.clearCart();
      setTimeout(() => this.router.navigate(['/userviewproduct']), 1500);
    });
  }
}