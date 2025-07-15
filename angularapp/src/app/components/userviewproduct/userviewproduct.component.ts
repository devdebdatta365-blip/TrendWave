
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  selectedProduct: Product | null = null;
  quantity: { [key: number]: number } = {};
  showAddCartModal = false;
  addedProductName = '';

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => this.products = products);
  }

  filteredProducts() {
    if (!this.searchTerm) return this.products;
    return this.products.filter(p => p.productName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  addToCart(product: Product) {
    const qty = this.quantity[product.productId!] || 1;
    this.cartService.addToCart(product, qty);
    this.addedProductName = product.productName;
    this.showAddCartModal = true;
  }

  closeAddCartModal() {
    this.showAddCartModal = false;
    this.addedProductName = '';
  }
}
