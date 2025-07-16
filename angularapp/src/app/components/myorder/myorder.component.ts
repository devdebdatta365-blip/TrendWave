import { Component, OnInit } from '@angular/core';

import { Order } from 'src/app/models/order.model';


import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  orders: Order[] = [];
  userId: number | null = null;
  selectedOrder: Order | null = null;
  showItemsModal = false;
  showTrackModal = false;
  showCancelModal = false;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.orderService.getOrdersByUserId(this.userId).subscribe(orders => this.orders = orders);
    }
  }
  

  //Show the orders in selected order
  viewItems(order: Order) {
    this.selectedOrder = order;
    this.showItemsModal = true;
  }

  //To show the tractking status of the selected order
  trackOrder(order: Order) {
    this.selectedOrder = order;
    this.showTrackModal = true;
  }

  //Confirmation message for deletion
  cancelOrder(order: Order) {
    this.selectedOrder = order;
    this.showCancelModal = true;
  }
<<<<<<< HEAD

 
  confirmCancelOrder() {
    if (this.selectedOrder) {
      this.orderService.deleteOrder(this.selectedOrder.orderId!).subscribe(() => {
        this.orders = this.orders.filter(o => o.orderId !== this.selectedOrder?.orderId);
        this.showCancelModal = false;
        this.selectedOrder = null;
      });
    }
  }

  //Closes the current modal and resets the order
  closeModal() {
    this.showItemsModal = false;
    this.showTrackModal = false;
    this.showCancelModal = false;
    this.selectedOrder = null;
  }


}

=======

 
  confirmCancelOrder() {
    if (this.selectedOrder) {
      this.orderService.deleteOrder(this.selectedOrder.orderId!).subscribe(() => {
        this.orders = this.orders.filter(o => o.orderId !== this.selectedOrder?.orderId);
        this.showCancelModal = false;
        this.selectedOrder = null;
      });
    }
  }

  //Closes the current modal and resets the order
  closeModal() {
    this.showItemsModal = false;
    this.showTrackModal = false;
    this.showCancelModal = false;
    this.selectedOrder = null;
  }


}





>>>>>>> f0e1fcffabe7492de873828c2683de56b2a51513
