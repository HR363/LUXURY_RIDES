import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Vehicle, Location, User } from '../types';
import { LucideIconComponent } from '../shared/lucide-icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent, FormsModule],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.css'
})
export class VehicleDetail implements OnInit, OnDestroy {
  vehicle: Vehicle | null = null;
  loading = false;
  error = '';
  showBookingModal = false;
  locations: Location[] = [];
  bookingForm = {
    startDate: '',
    endDate: '',
    pickupLocationId: '',
    dropoffLocationId: ''
  };
  bookingLoading = false;
  bookingError = '';
  bookingSuccess = '';
  totalPrice: number | null = null;

  // Review state
  reviews: any[] = [];
  reviewsLoading = false;
  reviewsError = '';
  reviewForm = { rating: 5, comment: '' };
  reviewSubmitting = false;
  reviewError = '';
  reviewSuccess = '';
  user: User | null = null;
  userLoading = false;
  userError = '';
  private userSubscription: any;
  hoveredStar = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadVehicle();
    this.userLoading = true;
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.userLoading = false;
      this.cdr.detectChanges();
    });
  }

  loadVehicle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Invalid vehicle ID.';
      console.log('Set error:', this.error);
      return;
    }
    this.loading = true;
    console.log('Set loading:', this.loading);
    this.apiService.getVehicle(id).subscribe({
      next: (vehicle) => {
        console.log('Vehicle loaded:', vehicle);
        this.vehicle = vehicle;
        this.loading = false;
        console.log('Set loading:', this.loading);
        this.cdr.detectChanges();
        this.loadReviews();
      },
      error: (err) => {
        this.error = 'Vehicle not found or failed to load.';
        this.loading = false;
        console.log('Set error:', this.error, 'Set loading:', this.loading);
        this.cdr.detectChanges();
      }
    });
  }

  loadReviews(): void {
    if (!this.vehicle) return;
    this.reviewsLoading = true;
    this.apiService.getReviews(this.vehicle.id).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.reviewsLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.reviewsError = err.message || 'Failed to load reviews.';
        this.reviewsLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  canReview(): boolean {
    if (!this.user || !this.vehicle) return false;
    // User must not have already reviewed this vehicle
    const alreadyReviewed = this.reviews.some(r => r.userId === this.user!.id);
    // User must have at least one booking for this vehicle (backend enforces, but we can check for UI)
    // For now, we rely on backend for booking check
    return !alreadyReviewed;
  }

  userReview(): any | null {
    if (!this.user) return null;
    return this.reviews.find(r => r.userId === this.user!.id) || null;
  }

  submitReview(): void {
    if (!this.vehicle) return;
    this.reviewSubmitting = true;
    this.reviewError = '';
    this.apiService.addReview(this.vehicle.id, this.reviewForm.rating, this.reviewForm.comment).subscribe({
      next: (review) => {
        this.reviewForm = { rating: 5, comment: '' };
        this.reviewSubmitting = false;
        this.reviewSuccess = 'Review submitted successfully!';
        setTimeout(() => { this.reviewSuccess = ''; }, 3000);
        this.loadReviews();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.reviewError = err.message || 'Failed to submit review.';
        this.reviewSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteReview(reviewId: number): void {
    if (!confirm('Are you sure you want to delete your review?')) return;
    this.apiService.deleteReview(reviewId).subscribe({
      next: () => {
        this.loadReviews();
        this.cdr.detectChanges();
      },
      error: (err) => {
        alert(err.message || 'Failed to delete review.');
      }
    });
  }

  bookNow(): void {
    this.showBookingModal = true;
    this.fetchLocations();
  }

  fetchLocations(): void {
    this.apiService.getLocations().subscribe({
      next: (locations) => {
        console.log('Fetched locations:', locations);
        this.locations = locations;
      },
      error: () => {
        this.locations = [];
      }
    });
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    this.bookingForm = {
      startDate: '',
      endDate: '',
      pickupLocationId: '',
      dropoffLocationId: ''
    };
    this.bookingLoading = false;
    this.bookingError = '';
    this.bookingSuccess = '';
    this.totalPrice = null;
  }

  onBookingFormChange(): void {
    // Calculate total price if dates are valid
    const { startDate, endDate } = this.bookingForm;
    if (startDate && endDate && this.vehicle) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      if (days > 0) {
        this.totalPrice = days * parseFloat(this.vehicle.pricePerDay);
      } else {
        this.totalPrice = null;
      }
    } else {
      this.totalPrice = null;
    }
  }

  submitBooking(): void {
    this.bookingLoading = true;
    this.bookingError = '';
    this.bookingSuccess = '';
    if (!this.vehicle) return;
    // Validate form
    const { startDate, endDate, pickupLocationId, dropoffLocationId } = this.bookingForm;
    if (!startDate || !endDate || !pickupLocationId || !dropoffLocationId) {
      this.bookingError = 'Please fill in all fields.';
      this.bookingLoading = false;
      return;
    }
    if (!this.totalPrice || this.totalPrice <= 0) {
      this.bookingError = 'Invalid dates or price.';
      this.bookingLoading = false;
      return;
    }
    // Prepare booking payload
    const payload = {
      vehicleId: this.vehicle.id,
      startDate,
      endDate,
      pickupLocationId: Number(pickupLocationId),
      dropoffLocationId: Number(dropoffLocationId),
      totalPrice: this.totalPrice.toString(),
      status: "PENDING" as const,
      // userId will be set by backend from JWT
    };
    this.apiService.createBooking(payload).subscribe({
      next: () => {
        console.log('Booking API call succeeded');
        this.bookingSuccess = 'Booking successful!';
        this.bookingLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.closeBookingModal();
          this.cdr.detectChanges();
          this.router.navigate(['/bookings']);
        }, 2000);
      },
      error: (err) => {
        console.log('Booking API call failed', err);
        this.bookingError = err.message || 'Booking failed.';
        this.bookingLoading = false;
      }
    });
  }

  get bookingDisabled(): boolean {
    return !!this.bookingSuccess || this.bookingLoading;
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }

  setStarRating(star: number): void {
    this.reviewForm.rating = star;
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
} 