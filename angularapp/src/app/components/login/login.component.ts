
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onLogin() {
    this.submitted = true;
    this.errorMsg = '';
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        
        console.log('Raw token:', res);

        this.authService.setToken(res.token);
        
        //save role and userId in localstorage
        
        localStorage.setItem('userRole',res.userRole);
        localStorage.setItem('userId',res.userId);
        
        //Also push them to BehaviorSubjects if needed

        this.authService.userRole.next(res.userRole);
        this.authService.userId.next(res.userId);

        //Redirect

        if (res.userRole.toUpperCase() === 'ADMIN') {
          this.router.navigate(['/adminviewproduct']);
          alert("successful as admin");
          console.log(res.userRole);
        } else {
          // this.router.navigate(['/user/view-properties']);
          this.router.navigate(['/home-page']);
          console.log(res.userRole);
          alert("successful as user");
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMsg = 'Invalid Email or Password';
      }
    });
  }
}

