import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPasswordComponent {
  email = '';
  code = '';
  newPassword = '';
  message = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.message = '';
    this.authService.resetPassword(this.email, this.code, this.newPassword).subscribe({
      next: (res) => {
        this.message = res.message;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to reset password.';
        this.loading = false;
      }
    });
  }
} 