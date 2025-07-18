

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  showSuccessPopup = false;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      descripion: ['', Validators.required],
      price: ['', Validators.required],
      stockInteger: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      coverImage: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      this.showSuccessPopup = true;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ coverImage: file });
    }
  }

  onPopupOk() {
    this.showSuccessPopup = false;
    this.router.navigate(['/adminviewproduct']);
  }
}


