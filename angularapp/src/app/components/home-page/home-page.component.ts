
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../services/product.service';
// import { Product } from '../../models/product.model';
// import { CartService } from '../../services/cart.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home-page',
//   templateUrl: './home-page.component.html',
//   styleUrls: ['./home-page.component.css']
// })
// export class HomePageComponent implements OnInit {
//   featuredProducts: Product[] = [];
//   categories: string[] = [];
//   loading = false;

//   constructor(
//     private productService: ProductService,
//     private cartService: CartService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadFeaturedProducts();
//   }

//   loadFeaturedProducts(): void {
//     this.loading = true;
//     this.productService.getAllProducts().subscribe({
//       next: (products) => {
//         this.featuredProducts = products.slice(0, 8); // Show first 8 products
//         this.categories = [...new Set(products.map(p => p.category))];
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error loading products:', error);
//         this.loading = false;
//       }
//     });
//   }

//   addToCart(product: Product): void {
//     this.cartService.addToCart(product, 1);
//     alert('Product added to cart!');
//   }

//   viewProduct(productId: number): void {
//     this.router.navigate(['/product', productId]);
//   }

//   browseCategory(category: string): void {
//     this.router.navigate(['/userviewproduct'], { queryParams: { category } });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  featuredProducts: Product[] = [];
  categories: string[] = [];
  loading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products.slice(0, 8); // Show first 8 products
        this.categories = [...new Set(products.map(p => p.category))];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert('Product added to cart!');
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  browseCategory(category: string): void {
    this.router.navigate(['/userviewproduct'], { queryParams: { category } });
  }
}
