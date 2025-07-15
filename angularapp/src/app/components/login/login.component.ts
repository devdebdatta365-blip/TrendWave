// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { AuthService } from '../../services/auth.service';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent implements OnInit {
// //   loginForm: FormGroup;
// //   loginError: string = '';

// //   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

// //   ngOnInit() {
// //     this.loginForm = this.fb.group({
// //       email: ['', [Validators.required, Validators.email]],
// //       password: ['', [Validators.required, Validators.minLength(6)]]
// //     });
// //   }

// //   get email() { return this.loginForm.get('email'); }
// //   get password() { return this.loginForm.get('password'); }

// //   onLogin() {
// //     if (this.loginForm.invalid) return;
// //     this.authService.login(this.loginForm.value).subscribe({
// //       next: (res) => {
// //         this.authService.setToken(res.token);
// //         this.authService.setUserRole(res.userRole);
// //         this.authService.setUserId(res.userId);
// //         if (res.userRole === 'Admin') {
// //           this.router.navigate(['/adminnav']);
// //         } else {
// //           this.router.navigate(['/usernav']);
// //         }
// //       },
// //       error: () => {
// //         this.loginError = 'Invalid Email or Password';
// //       }
// //     });
// //   }
// // }


// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { AuthService } from '../../services/auth.service';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent implements OnInit {
// //   loginForm: FormGroup;
// //   loginError: string = '';

// //   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

// //   ngOnInit() {
// //     this.loginForm = this.fb.group({
// //       email: ['', [Validators.required, Validators.email]],
// //       password: ['', [Validators.required, Validators.minLength(6)]]
// //     });
// //   }

// //   get email() { return this.loginForm.get('email'); }
// //   get password() { return this.loginForm.get('password'); }

// //   onLogin() {
// //     if (this.loginForm.invalid) return;
// //     this.authService.login(this.loginForm.value).subscribe({
// //       next: (res) => {
// //         this.authService.setToken(res.token);
// //         this.authService.setUserRole(res.userRole);
// //         this.authService.setUserId(res.userId);
// //         if (res.userRole === 'Admin') {
// //           this.router.navigate(['/adminnav']);
// //         } else {
// //           this.router.navigate(['/usernav']);
// //         }
// //       },
// //       error: () => {
// //         this.loginError = 'Invalid Email or Password';
// //       }
// //     });
// //   }
// // }



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   loginError: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   get email() {
//     return this.loginForm.get('email');
//   }

//   get password() {
//     return this.loginForm.get('password');
//   }

//   onLogin(): void {
//     if (this.loginForm.invalid) return;

//     this.authService.login(this.loginForm.value).subscribe({
//       next: (res) => {
//         this.authService.setToken(res.token);
//         this.authService.setUserRole(res.userRole);
//         this.authService.setUserId(res.userId);

//         if (res.userRole === 'Admin') {
//           this.router.navigate(['/adminnav']);
//         } else {
//           this.router.navigate(['/usernav']);
//         }
//       },
//       error: () => {
//         this.loginError = 'Invalid Email or Password';
//       }
//     });
//   }
// }






import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';
  loginSuccess='';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    // if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.loginError = '';
    this.loginSuccess='';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res)=> {
        this.isLoading = false;
        this.authService.setToken(res.token);
        this.authService.setUserRole(res.userRole);
        this.authService.setUserId(res.userId);
        this.loginSuccess = 'Login successful! Redirecting...';
        console.log('logg');
        if (res.userRole === 'Admin') {
          this.router.navigate(['/adminnav']);
        } else {
          this.router.navigate(['/usernav']);
        }
      },
      error: () => {
        this.isLoading = false;
           }});
  }
}
