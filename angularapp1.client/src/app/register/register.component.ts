import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Router } from '@angular/router'; 
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router 
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration Form Value:', this.registerForm.value); 
      this.authService.register(this.registerForm.value).pipe(
        catchError(error => {
          this.errorMessage = error?.error?.message || 'Registration failed. Please try again.';
          this.successMessage = '';
          this.snackBar.open(this.errorMessage, 'Close', { 
            duration: 3000,
            panelClass: ['snack-bar-failure']
          });
          console.error('Error Response:', error); 
          return of(null);
        })
      ).subscribe({
        next: (response) => {
          if (response) {
            this.successMessage = 'Registration successful!';
            this.errorMessage = '';
            this.snackBar.open(this.successMessage, 'Close', { 
              duration: 3000,
              panelClass: ['snack-bar-success']
            });
            this.registerForm.reset();
            this.router.navigate(['/login']); 
          }
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      this.successMessage = '';
      this.snackBar.open(this.errorMessage, 'Close', { 
        duration: 3000,
        panelClass: ['snack-bar-warning']
      });
    }
  }
}
