import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../shared/lucide-icon.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideIconComponent],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class SignIn {
  signInForm: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.loading = true;
      this.error = '';

      const { email, password } = this.signInForm.value;
      
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          this.loading = false;
          // Role-based routing
          if (response.user.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(field: string): string {
    const control = this.signInForm.get(field);
    if (control?.errors) {
      if (control.errors['required']) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
} 