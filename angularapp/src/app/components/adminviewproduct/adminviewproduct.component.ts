
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminViewProductComponent implements OnInit {
  products: Product[] = [];
  showForm = false;
  editingProduct: Product | null = null;
  
  newProduct: Product = {
    productName: '',
    descripion: '',
    price: 0,
    stockInteger: 0,
    category: '',
    brand: '',
    coverImage: ''
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  openAddForm(): void {
    this.showForm = true;
    this.editingProduct = null;
    this.resetForm();
  }

  openEditForm(product: Product): void {
    this.showForm = true;
    this.editingProduct = product;
    this.newProduct = { ...product };
  }

  closeForm(): void {
    this.showForm = false;
    this.editingProduct = null;
    this.resetForm();
  }

  resetForm(): void {
    this.newProduct = {
      productName: '',
      descripion: '',
      price: 0,
      stockInteger: 0,
      category: '',
      brand: '',
      coverImage: ''
    };
  }

  onSubmit(): void {
    if (this.editingProduct) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (product) => {
        this.products.push(product);
        this.closeForm();
        alert('Product added successfully');
      },
      error: (error) => {
        console.error('Error adding product:', error);
        alert('Error adding product');
      }
    });
  }

  updateProduct(): void {
    if (this.editingProduct?.productId) {
      this.productService.updateProduct(this.editingProduct.productId, this.newProduct).subscribe({
        next: (updatedProduct) => {
          const index = this.products.findIndex(p => p.productId === this.editingProduct?.productId);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.closeForm();
          alert('Product updated successfully');
        },
        error: (error) => {
          console.error('Error updating product:', error);
          alert('Error updating product');
        }
      });
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.productId !== productId);
          alert('Product deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Error deleting product');
        }
      });
    }
  }
}

