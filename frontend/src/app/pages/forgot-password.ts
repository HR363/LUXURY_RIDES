import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.message = '';
    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.message = res.message;
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/reset-password']);
        }, 2000); // 2 seconds delay for user to see the message
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to send reset code.';
        this.loading = false;
      }
    });
  }
} 