
import { OrderItem } from "./order-item.model";
import { User } from "./user.model";

export interface Order {
    orderId?: number; 
    orderDate: string; 
    orderStatus: string; 
    shippingAddress: string; 
    billingAddress: string; 
    totalAmount: number; // Total cost of the order
    user: User; // Reference to the user who placed the order
    orderItems: OrderItem[]; // List of items included in the order
   }
