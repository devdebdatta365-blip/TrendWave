import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})
export class OrderplacedComponent implements OnInit {

  orders: Order[] = [];
  searchTerm: string = '';
  sortAsc: boolean = true;
  selectedOrder: Order | null = null;
  showItemsModal = false;
  showUserModal = false;
  showStatusModal = false;
  orderStatusOptions = ['Pending', 'Accepted', 'Dispatched', 'OutForDelivery', 'Delivered'];
  statusUpdateSuccess = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    //this.orderService.getAllOrders().subscribe(orders => this.orders = orders);

    this.orders = [
      {
        orderId: 101,
        orderDate: '2025-07-14',
        orderStatus: 'Pending',
        shippingAddress: '123 Demo Street, Bengaluru',
        billingAddress: '456 Billing Lane, Bengaluru',
        totalAmount: 30500,
        user: {
<<<<<<< HEAD
=======
          userId: 1,
>>>>>>> f0e1fcffabe7492de873828c2683de56b2a51513
          username: 'john_doe',
          email: 'john@example.com',
          password: '',
          mobileNumber: '9876543210',
          userRole: 'customer'
        },
        orderItems: [
          {
            orderItemId: 1,
            product: {
              productId: 201,
              productName: 'Stereo Earphones',
              description: 'High-quality stereo earphones with noise cancellation.',
              price: 499,
              stockQuantity: 100,
              category: 'Electronics',
              brand: 'SoundMax',
              coverImage: 'earphones.jpg'
            },
            quantity: 10,
            price: 499
          },
          {
            orderItemId: 2,
            product: {
              productId: 202,
              productName: 'Sample Mobile Product',
              description: 'Latest smartphone with advanced features.',
              price: 25000,
              stockQuantity: 50,
              category: 'Mobiles',
              brand: 'TechBrand',
              coverImage: 'mobile.jpg'
            },
            quantity: 1,
            price: 25000
          }

        ]
      }
    ];

    


  }
  /*Filters orders based on the searched Term
   Sorts order based on date */
  filteredOrders() {
    let filtered = this.orders;
    if (this.searchTerm) {
      filtered = filtered.filter(o =>
        o.orderId?.toString().includes(this.searchTerm) ||
        o.user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return filtered.sort((a, b) => this.sortAsc
      ? new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      : new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );
  }

  //View items in the selected order
  openItemsModal(order: Order) {
    this.selectedOrder = order;
    this.showItemsModal = true;
<<<<<<< HEAD
  }

  //To show the user profile of the selected order
  openUserModal(order: Order) {
    this.selectedOrder = order;
    this.showUserModal = true;
  }

  //To show the  status update conformation after updating
  openStatusModal(order: Order) {
    this.selectedOrder = order;
    this.showStatusModal = true;
  }

=======
  }

  //To show the user profile of the selected order
  openUserModal(order: Order) {
    this.selectedOrder = order;
    this.showUserModal = true;
  }

  //To show the  status update conformation after updating
  openStatusModal(order: Order) {
    this.selectedOrder = order;
    this.showStatusModal = true;
  }

>>>>>>> f0e1fcffabe7492de873828c2683de56b2a51513
  //Updated the orders based on orderStatusOptions
  updateOrderStatus(newStatus: string) {
    if (!this.selectedOrder) return;
    const updatedOrder = { ...this.selectedOrder, orderStatus: newStatus };
    this.orderService.updateOrder(this.selectedOrder.orderId!, updatedOrder).subscribe(() => {
      this.statusUpdateSuccess = true;
      this.loadOrders();
      setTimeout(() => {
        this.statusUpdateSuccess = false;
        this.showStatusModal = false;
        this.selectedOrder = null;
      }, 1200);
    });
  }

  closeModal() {
    this.showItemsModal = false;
    this.showUserModal = false;
    this.showStatusModal = false;
    this.selectedOrder = null;
  }


}

