import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideIconComponent } from '../shared/lucide-icon.component';
import { VehicleCardComponent } from '../shared/vehicle-card.component';
import { ApiService } from '../services/api.service';
import { Vehicle } from '../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    LucideIconComponent,
    VehicleCardComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  searchForm: FormGroup;
  featuredVehicles: Vehicle[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      pickupLocation: ['', Validators.required],
      dropoffLocation: ['', Validators.required],
      pickupDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFeaturedVehicles();
  }

  loadFeaturedVehicles(): void {
    this.loading = true;
    this.error = '';
    this.apiService.getVehicles({ isAvailable: true }).subscribe({
      next: (vehicles) => {
        this.featuredVehicles = vehicles.slice(0, 6); // Show first 6 available vehicles
        this.loading = false;
        this.error = '';
      },
      error: (error) => {
        console.error('Error loading featured vehicles:', error);
        this.error = 'Failed to load featured vehicles. Please try again.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const searchParams = this.searchForm.value;
      this.router.navigate(['/vehicles'], { 
        queryParams: searchParams 
      });
    }
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getMinReturnDate(): string {
    const pickupDate = this.searchForm.get('pickupDate')?.value;
    if (pickupDate) {
      const minDate = new Date(pickupDate);
      minDate.setDate(minDate.getDate() + 1);
      return minDate.toISOString().split('T')[0];
    }
    return this.getMinDate();
  }

  get isEmpty(): boolean {
    return !this.loading && !this.error && this.featuredVehicles.length === 0;
  }
} 