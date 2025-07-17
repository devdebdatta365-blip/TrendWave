// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ProductService } from 'src/app/services/product.service';

// @Component({
//   selector: 'app-create-product',
//   templateUrl: './product-create.component.html',
//   styleUrls: ['./product-create.component.css']
// })
// export class ProductCreateComponent implements OnInit {

//   productForm: FormGroup;
//   showSuccessPopup = false;
//   submitted = false;

//   constructor(private fb: FormBuilder, private router: Router,private pservice:ProductService) {
//     this.productForm = this.fb.group({
//       productName: ['', Validators.required],
//       description: ['', Validators.required],
//       price: ['', Validators.required],
//       stockQuantity: ['', Validators.required],
//       category: ['', Validators.required],
//       brand: ['', Validators.required],
//       coverImage: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit() {
//     this.submitted = true;

//     if (this.productForm.valid) {
//       this.showSuccessPopup = true;
//       this.pservice.addProduct(this.productForm.value).subscribe((success)=>{
//         console.log('added');
//       })
//     }
//   }

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.productForm.patchValue({ coverImage: file });
//     }
//   }

//   onPopupOk() {
//     this.showSuccessPopup = false;
//     this.router.navigate(['/adminviewproduct']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm:FormGroup;
  showSuccessPopup = false;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router,private route:ActivatedRoute, private pservice: ProductService) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stockInteger: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      coverImage: ['', Validators.required]
         });
  }

  ngOnInit(): void {}
  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const productId = params['id'];
  //     if (productId) {
  //       this.isUpdateMode = true;
  //       this.productIdToUpdate = +productId;
  //       this.pservice.getProductById(this.productIdToUpdate).subscribe(product => {
  //         this.productForm.patchValue({
  //           productName: product.productName,
  //           description: product.description,
  //           price: product.price,
  //           stockQuantity: product.stockQuantity,
  //           category: product.category,
  //           brand: product.brand
  //         });
  //       });
  //     }
  //   });
  // }
  // isUpdateMode=false;
  // productIdToUpdate:any;
  

  onSubmit() {
    this.submitted = true;

    if (this.productForm.valid) {
      this.pservice.addProduct(this.productForm.value).subscribe({
        next: () => {
          this.showSuccessPopup = true;
          console.log('Product added successfully');
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ coverImage: file });
      this.productForm.get('coverImage')?.updateValueAndValidity();
    }
  }

  onPopupOk() {
    this.showSuccessPopup = false;
    this.router.navigate(['/adminviewproduct']);
  }
}
//above is add working

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductService } from 'src/app/services/product.service';

// @Component({
//   selector: 'app-create-product',
//   templateUrl: './product-create.component.html',
//   styleUrls: ['./product-create.component.css']
// })
// export class ProductCreateComponent implements OnInit {

//   productForm: FormGroup;
//   showSuccessPopup = false;
//   submitted = false;
//   isUpdateMode = false;
//   productIdToUpdate: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute, 
//     private pservice: ProductService
//   ) {
//     this.productForm = this.fb.group({
//       productName: ['', Validators.required],
//       description: ['', Validators.required],
//       price: ['', Validators.required],
//       stockQuantity: ['', Validators.required],
//       category: ['', Validators.required],
//       brand: ['', Validators.required],
//       coverImage: ['', Validators.required]
//     });
//   }
  

//   ngOnInit(): void {
//     const productId = this.route.snapshot.paramMap.get('id');
//     if (productId) {
//       this.isUpdateMode = true;
//       this.productIdToUpdate = +productId;
//       this.pservice.getProductById(this.productIdToUpdate).subscribe(product => {
//         this.productForm.patchValue({
//           productName: product.productName,
//           description: product.description,
//           price: product.price,
//           stockQuantity: product.stockQuantity,
//           category: product.category,
//           brand: product.brand
//         });
//       });
//     }
//   }

//   onSubmit() {
//     this.submitted = true;

//     if (this.productForm.valid) {
//       const formData = new FormData();
//       formData.append('productName', this.productForm.get('productName')?.value);
//       formData.append('description', this.productForm.get('description')?.value);
//       formData.append('price', this.productForm.get('price')?.value);
//       formData.append('stockInteger', this.productForm.get('stockQuantity')?.value);
//       formData.append('category', this.productForm.get('category')?.value);
//       formData.append('brand', this.productForm.get('brand')?.value);
//       formData.append('coverImage', this.productForm.get('coverImage')?.value);

//       if (this.isUpdateMode && this.productIdToUpdate !== null) {
//         this.pservice.updateProduct(this.productIdToUpdate, formData).subscribe({
//           next: () => {
//             this.showSuccessPopup = true;
//             console.log('Product updated successfully');
//           },
//           error: err => {
//             console.error('Error updating product:', err);
//           }
//         });
//       } else {
//         this.pservice.addProduct(formData).subscribe({
//           next: () => {
//             this.showSuccessPopup = true;
//             console.log('Product added successfully');
//           },
//           error: err => {
//             console.error('Error adding product:', err);
//           }
//         });
//       }
//     }
//   }

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.productForm.patchValue({ coverImage: file });
//       this.productForm.get('coverImage')?.updateValueAndValidity();
//     }
//   }

//   onPopupOk() {
//     this.showSuccessPopup = false;
//     this.router.navigate(['/adminviewproduct']);
//   }
// }

