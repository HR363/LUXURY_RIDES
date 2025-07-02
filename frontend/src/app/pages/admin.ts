import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideIconComponent } from '../shared/lucide-icon.component';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { DashboardStats, Vehicle, User, Booking, EditableUser } from '../types';
import { ToastService } from '../shared/toast.service';

interface AdminReview {
  id: number;
  rating: number;
  comment?: string | null;
  createdAt: string;
  user: { id: number; email: string; firstName: string; lastName: string };
  vehicle: { id: number; make: string; model: string };
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  currentUser: User | null = null;
  stats: DashboardStats | null = null;
  loading = false;
  error = '';
  
  activeSection: 'vehicles' | 'overview' | 'users' | 'bookings' | 'reviews' = 'overview';
  
  // Data for different sections
  vehicles: Vehicle[] = [];
  users: EditableUser[] = [];
  bookings: Booking[] = [];
  reviews: AdminReview[] = [];
  reviewsLoading = false;
  reviewsError: string | null = null;

  showAddVehicleForm = false;
  newVehicle: Partial<Vehicle> = {};
  editingVehicle: Partial<Vehicle> | null = null;
  selectedImageFile: File | null = null;
  uploadingImage = false;

  approvingBookingId: number | null = null;
  rejectingBookingId: number | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.checkAdminAccess();
    this.loadDashboardStats();
    this.loadReviews();
  }

  checkAdminAccess(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || !this.authService.isAdmin()) {
      this.error = 'Access denied. Admin privileges required.';
    }
  }

  loadDashboardStats(): void {
    this.loading = true;
    this.apiService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load dashboard stats';
        this.loading = false;
        console.error('Error loading stats:', error);
      }
    });
  }

  loadSectionData(section: 'overview' | 'vehicles' | 'users' | 'bookings' | 'reviews'): void {
    this.activeSection = section;
    switch (section) {
      case 'vehicles':
        this.loadVehicles();
        break;
      case 'users':
        this.loadUsers();
        break;
      case 'bookings':
        this.loadBookings();
        break;
      case 'reviews':
        this.loadReviews();
        break;
    }
  }

  loadVehicles(): void {
    this.apiService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
      },
      error: (error) => {
        console.error('Error loading vehicles:', error);
      }
    });
  }

  loadUsers(): void {
    this.apiService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.map(u => ({ ...u, editRole: u.role }));
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  loadBookings(): void {
    this.apiService.getAllBookings().subscribe({
      next: (bookings) => {
        // Sort by createdAt descending (newest first)
        this.bookings = bookings.sort((a, b) => {
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bDate - aDate;
        });
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
      }
    });
  }

  loadReviews(): void {
    this.reviewsLoading = true;
    this.reviewsError = null;
    this.apiService.getAllAdminReviews().subscribe({
      next: (data: AdminReview[]) => {
        this.reviews = data;
        this.reviewsLoading = false;
      },
      error: (err: any) => {
        this.reviewsError = err?.error?.message || 'Failed to load reviews.';
        this.reviewsLoading = false;
      },
    });
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

  getRoleColor(role: string): string {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800';
      case 'AGENT': return 'bg-blue-100 text-blue-800';
      case 'CUSTOMER': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  formatCurrency(amount: string): string {
    return `KES ${parseFloat(amount).toLocaleString()}`;
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }

  addVehicle(): void {
    if (!this.newVehicle.make || !this.newVehicle.model || !this.newVehicle.category || !this.newVehicle.pricePerDay) {
      return;
    }
    this.apiService.createVehicle(this.newVehicle).subscribe({
      next: (vehicle) => {
        this.showAddVehicleForm = false;
        this.newVehicle = {};
        this.loadVehicles();
      },
      error: (error) => {
        alert('Failed to add vehicle.');
        console.error('Error adding vehicle:', error);
      }
    });
  }

  startEditVehicle(vehicle: Vehicle): void {
    this.editingVehicle = { ...vehicle };
  }

  saveEditVehicle(): void {
    if (!this.editingVehicle || !this.editingVehicle.id) return;
    const { id, ...updatePayload } = this.editingVehicle;
    this.apiService.updateVehicle(id!, updatePayload).subscribe({
      next: () => {
        this.editingVehicle = null;
        this.loadVehicles();
      },
      error: (error) => {
        alert('Failed to update vehicle.');
        console.error('Error updating vehicle:', error);
      }
    });
  }

  cancelEditVehicle(): void {
    this.editingVehicle = null;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    }
  }

  uploadImage(): void {
    if (!this.selectedImageFile) return;
    const formData = new FormData();
    formData.append('file', this.selectedImageFile);
    this.uploadingImage = true;
    this.apiService.uploadVehicleImage(formData).subscribe({
      next: (res) => {
        this.newVehicle.imageUrl = res.imageUrl;
        this.uploadingImage = false;
        this.selectedImageFile = null;
      },
      error: (err) => {
        alert('Image upload failed.');
        this.uploadingImage = false;
      }
    });
  }

  approveBooking(bookingId: number): void {
    this.approvingBookingId = bookingId;
    this.apiService.approveBooking(bookingId).subscribe({
      next: (updatedBooking) => {
        const idx = this.bookings.findIndex(b => b.id === bookingId);
        if (idx !== -1) {
          this.bookings = [
            ...this.bookings.slice(0, idx),
            updatedBooking,
            ...this.bookings.slice(idx + 1)
          ];
        }
        this.toastService.show('Booking approved!', 'success');
        this.approvingBookingId = null;
      },
      error: (error) => {
        this.toastService.show('Failed to approve booking', 'error');
        this.approvingBookingId = null;
      }
    });
  }

  rejectBooking(bookingId: number): void {
    this.rejectingBookingId = bookingId;
    this.apiService.rejectBooking(bookingId).subscribe({
      next: (updatedBooking) => {
        const idx = this.bookings.findIndex(b => b.id === bookingId);
        if (idx !== -1) {
          this.bookings = [
            ...this.bookings.slice(0, idx),
            updatedBooking,
            ...this.bookings.slice(idx + 1)
          ];
        }
        this.toastService.show('Booking rejected!', 'success');
        this.rejectingBookingId = null;
      },
      error: (error) => {
        this.toastService.show('Failed to reject booking', 'error');
        this.rejectingBookingId = null;
      }
    });
  }

  changeUserRole(user: any): void {
    if (!user.editRole || user.editRole === user.role) return;
    this.apiService.updateUserRole(user.id, user.editRole).subscribe({
      next: (updated) => {
        user.role = updated.role;
        this.toastService.show('Role updated successfully', 'success');
      },
      error: (err) => {
        this.toastService.show(err.message || 'Failed to update role', 'error');
      }
    });
  }

  deleteVehicle(vehicleId: number): void {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    this.apiService.deleteVehicle(vehicleId).subscribe({
      next: () => {
        this.toastService.show('Vehicle deleted successfully', 'success');
        this.loadVehicles();
      },
      error: (err) => {
        this.toastService.show(err.message || 'Failed to delete vehicle', 'error');
      }
    });
  }
} 