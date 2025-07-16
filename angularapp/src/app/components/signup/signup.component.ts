import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }


  signupForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const user:User = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      mobileNumber: this.signupForm.value.mobile,
      password: this.signupForm.value.password,
      userRole: this.signupForm.value.role
    };

    this.authService.register(user).subscribe({
      next: (res) => {
        console.log('User registered successfully', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}


