
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserStoreService } from 'src/app/helpers/user-store.service';
// import { Login } from 'src/app/models/login.model';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   errorMessage: string = '';
//   showSuccessModal = false;
//   constructor(private authService: AuthService, private router: Router, private userStore: UserStoreService, private fb: FormBuilder) {
//     this.loginForm = this.fb.group({
//       email: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {

//   }
//   onSubmit(): void {
//     if (this.loginForm.invalid) {
//       this.loginForm.markAllAsTouched();
//       return;
//     }
//     const loginData: Login = {
//       email: this.loginForm.value.email,
//       password: this.loginForm.value.password
//     };
//     this.authService.login(loginData).subscribe({
//       next: (user: any) => {

//         const mappedUser = {
//           ...user,
//           role: user.userRole // map 'userRole' to 'role'
//         };

//         this.userStore.setUser(mappedUser);
//         this.showSuccessModal = true;
//         console.log(user);
//         this.redirectBasedOnRole();
//       },
//       error: (err) => {
//         this.errorMessage = "Invalid Credentials! Please Try Again.";
//         console.log("Login Error", err);
//       }
//     });
//   }
//   private redirectBasedOnRole(): void {
//     this.showSuccessModal = false;
//     console.log(this.userStore.authUser);
//     //const role = this.userStore.authUser?.role;
//     this.router.navigate(['/home']);
//   }
// }





// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//   credentials = {
//     email: '',
//     password: ''
//   };

//   constructor(private http: HttpClient) {}

//   login() {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
  
//     this.http.post('https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080/api/login', this.credentials, { headers, observe: 'response' })
//       .subscribe({
//         // next: (response) => {
//           next: (response: HttpResponse<any>) => {
//           if (response.status === 200 || response.status === 201) {
//             const token = response.body?.token;
//             localStorage.setItem('authToken', token);
//             alert('Login successful!');
//           } else {
//             alert('Unexpected response status: ' + response.status);
//           }
//         },
//         error: (error) => {
//           console.error('Login failed:', error);
//           alert(`Login failed: ${error.error?.message || 'Unauthorized'}`);
//         }
//       });
//     }
  
// }

// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//   credentials = {
//     email: '',
//     password: ''
//   };

//   constructor(private http: HttpClient) {}

//   login() {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });

//     this.http.post('https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080/api/login', this.credentials, {
//       headers,
//       observe: 'response' // allows access to status code and headers
//     }).subscribe({
//       next: (response: HttpResponse<any>) => {
//         if (response.status === 200 || response.status === 201) {
//           const token = response.body?.token;
//           if (token) {
//             localStorage.setItem('authToken', token);
//             alert('Login successful!');
//           } else {
//             alert('Login successful, but no token received.');
//           }
//         } else {
//           alert(`Unexpected response status: ${response.status}`);
//         }
//       },
//       error: (error) => {
//         console.error('Login failed:', error);
//         alert(`Login failed: ${error.error?.message || 'Unauthorized'}`);
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: Login = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Username and Password are required.';
      return;
    }
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.email);
        localStorage.setItem('userRole', res.userRole);
        localStorage.setItem('userId', res.userId.toString());
        alert('Your account has logged in successfully!');
        if (res.userRole === 'ADMIN') {
          this.router.navigate(["/adminnav"]);
        } else {
          this.router.navigate(["/usernav"]);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid Username or Password.';
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
