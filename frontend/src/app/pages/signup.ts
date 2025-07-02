import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../shared/lucide-icon.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideIconComponent],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignUp {
  signUpForm: FormGroup;
  loading = false;
  error = '';
  success = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+254\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const formData = this.signUpForm.value;
      delete formData.confirmPassword;

      this.apiService.register(formData).subscribe({
        next: (response: any) => {
          this.loading = false;
          this.success = 'Account created successfully! Please sign in.';
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 2000);
        },
        error: (error: any) => {
          this.loading = false;
          this.error = error.error?.message || 'Registration failed. Please try again.';
          console.error('Registration error:', error);
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getErrorMessage(field: string): string {
    const control = this.signUpForm.get(field);
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
      if (control.errors['pattern']) {
        if (field === 'phone') {
          return 'Please enter a valid Kenyan phone number (+254XXXXXXXXX)';
        }
      }
      if (control.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }
} 