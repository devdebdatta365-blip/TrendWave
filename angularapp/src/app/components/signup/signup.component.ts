
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { User } from 'src/app/models/user.model';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent{
//   errorMessage: string = '';
//   successMessage: string = '';

//   constructor(private authService: AuthService,
//     private router: Router) {

//   }
//   register(form: NgForm): void {
//     if (form.valid) {
//       const userData: User = new User(
//         form.value.email,
//         form.value.password,
//         form.value.userName,
//         form.value.mobileNumber,
//         form.value.userRole
//       );

//       this.authService.register(userData).subscribe({
//         next: (registeredUser) => {
//           this.successMessage = 'Registration successful!';
//           // setTimeout(() => {
//           //   this.router.navigate(['/login']);
//           // }, 2000);
//         },
//         error: (err) => {
//           this.errorMessage = 'Registration failed. Please try again.';
//           console.error('Registration error', err);
//         }
//       });
//     }
//   }

// }
// register.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    userRole: 'USER'
  };
  confirmPassword: string = '';
  errorMessage: string = '';
  success: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.register(this.user).subscribe({
      next: () => {
        this.success = true;
      },
      error: (err) => {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }

  closeModal(): void {
    this.router.navigate(['/login']);
  }
}
