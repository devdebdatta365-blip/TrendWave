import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
      ]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.userStore.setUser(res); // Save user in UserStoreService
          console.log("res:",res);

          // Navigate based on role
          if (res.userRole === 'ADMIN') {
            this.router.navigate(['/adminnav']);
          } else if (res.userRole === 'USER') {
            this.router.navigate(['/usernav']);
          }
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
        console.error(err);
      }
    });
  }

}
