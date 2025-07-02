import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { User } from '../types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user: Partial<User> = {};
  loading = false;
  saving = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.api.getCurrentUser().subscribe({
      next: (user) => {
        this.user = { ...user };
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load profile.';
        this.loading = false;
      }
    });
  }

  saveProfile(): void {
    this.saving = true;
    this.error = null;
    this.success = null;
    this.api.updateProfile(this.user).subscribe({
      next: (updated) => {
        this.user = { ...updated };
        this.success = 'Profile updated successfully!';
        this.saving = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to update profile.';
        this.saving = false;
      }
    });
  }
} 