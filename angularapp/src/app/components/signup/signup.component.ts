

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userRole: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get f() { return this.signupForm.controls; }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSignup() {
    this.submitted = true;
    this.errorMsg = '';
    this.successMsg = '';
    if (this.signupForm.invalid) return;

    const { username, email, mobileNumber, password, userRole } = this.signupForm.value;
    const user = { username, email, mobileNumber, password, userRole };

    this.authService.register(user).subscribe({
      next: () => {
        this.successMsg = 'User Registration is Successful!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.errorMsg = 'Registration failed. Try again.';
      }
    });
  }
}

