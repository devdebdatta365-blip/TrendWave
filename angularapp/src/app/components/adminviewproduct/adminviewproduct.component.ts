import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit {
  products: Product[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      data => this.products = data,
      err => this.errorMessage = 'Could not load products'
    );
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => this.loadProducts(),
        err => this.errorMessage = 'Delete failed'
      );
    }
  }

  editProduct(productId: number) {
    this.router.navigate(['/product-create'], { queryParams: { id: productId } });
  }
}
