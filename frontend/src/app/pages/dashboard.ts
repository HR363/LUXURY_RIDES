import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideIconComponent } from '../shared/lucide-icon.component';
import { VehicleCardComponent } from '../shared/vehicle-card.component';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Vehicle, Booking, User } from '../types';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    LucideIconComponent,
    VehicleCardComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  user: User | null = null;
  userVehicles: Vehicle[] = [];
  userBookings: Booking[] = [];
  loading = false;
  error = '';
  
  activeTab: 'vehicles' | 'reservations' = 'vehicles';
  
  // Stats
  totalVehicles = 0;
  totalBookings = 0;
  activeBookings = 0;
  completedBookings = 0;

  bookingsLoading = false;
  bookingsError = '';

  cancellingBookingId: number | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserVehicles();
    this.loadUserBookings();
  }

  loadUserData(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      this.error = 'User not authenticated';
    }
  }

  loadUserVehicles(): void {
    this.loading = true;
    this.apiService.getVehicles().subscribe({
      next: (vehicles) => {
        // For now, show all vehicles. In a real app, you'd filter by user ownership
        this.userVehicles = vehicles;
        this.totalVehicles = vehicles.length;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load vehicles';
        this.loading = false;
        console.error('Error loading vehicles:', error);
      }
    });
  }

  loadUserBookings(): void {
    this.bookingsLoading = true;
    this.bookingsError = '';
    this.apiService.getBookings().subscribe({
      next: (bookings) => {
        this.userBookings = bookings;
        this.totalBookings = bookings.length;
        this.activeBookings = bookings.filter(b => 
          b.status === 'CONFIRMED' || b.status === 'PENDING'
        ).length;
        this.completedBookings = bookings.filter(b => 
          b.status === 'COMPLETED'
        ).length;
        this.bookingsLoading = false;
        this.bookingsError = '';
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.bookingsError = 'Failed to load bookings. Please try again.';
        this.bookingsLoading = false;
      }
    });
  }

  cancelBooking(bookingId: number): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.cancellingBookingId = bookingId;
      this.apiService.cancelBooking(bookingId).subscribe({
        next: (updatedBooking) => {
          // Update the booking in the list
          const idx = this.userBookings.findIndex(b => b.id === bookingId);
          if (idx !== -1) {
            this.userBookings = [
              ...this.userBookings.slice(0, idx),
              updatedBooking,
              ...this.userBookings.slice(idx + 1)
            ];
            console.log('Updated bookings:', this.userBookings);
            this.cdr.detectChanges();
          }
          this.toastService.show('Booking cancelled!', 'success');
          this.cancellingBookingId = null;
        },
        error: (error) => {
          this.toastService.show('Failed to cancel booking', 'error');
          this.cancellingBookingId = null;
        }
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'CheckCircle';
      case 'PENDING': return 'Clock';
      case 'CANCELLED': return 'XCircle';
      case 'COMPLETED': return 'CheckSquare';
      default: return 'HelpCircle';
    }
  }

  setActiveTab(tab: 'vehicles' | 'reservations'): void {
    this.activeTab = tab;
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }
} 