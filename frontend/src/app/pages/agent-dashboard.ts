import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Booking } from '../types';
import { FormsModule } from '@angular/forms';
import { LucideIconComponent } from '../shared/lucide-icon.component';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold mb-6">Agent Dashboard</h1>
      <div *ngIf="loading" class="text-gray-500">Loading bookings...</div>
      <div *ngIf="error" class="text-red-600 mb-4">{{ error }}</div>
      <div *ngIf="!loading && !error && bookings.length === 0" class="text-gray-400 italic">No bookings found.</div>
      <div *ngIf="!loading && !error && bookings.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking #</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">License Plate</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let booking of bookings">
              <td class="px-4 py-3 font-semibold">#{{ booking.id }}</td>
              <td class="px-4 py-3">{{ booking.vehicle?.make }} {{ booking.vehicle?.model }}</td>
              <td class="px-4 py-3 font-mono">{{ booking.vehicle?.licensePlate }}</td>
              <td class="px-4 py-3">{{ booking.user?.firstName }} {{ booking.user?.lastName }}<br><span class="text-xs text-gray-500">{{ booking.user?.email }}</span></td>
              <td class="px-4 py-3">{{ booking.startDate | date:'mediumDate' }} - {{ booking.endDate | date:'mediumDate' }}</td>
              <td class="px-4 py-3">KES {{ booking.totalPrice | number }}</td>
              <td class="px-4 py-3">
                <span [ngClass]="statusClass(booking.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <button *ngIf="booking.status === 'CONFIRMED'" (click)="markCompleted(booking)" [disabled]="completingId === booking.id"
                  class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs">
                  <span *ngIf="completingId !== booking.id">Mark as Completed</span>
                  <span *ngIf="completingId === booking.id">Marking...</span>
                </button>
                <span *ngIf="booking.status === 'COMPLETED'" class="text-green-700 font-semibold flex items-center gap-1">
                  <app-lucide-icon name="CheckCircle" class="w-4 h-4"></app-lucide-icon> Completed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AgentDashboard implements OnInit {
  bookings: Booking[] = [];
  loading = false;
  error = '';
  completingId: number | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.loading = true;
    this.error = '';
    this.apiService.getBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings.sort((a, b) => {
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bDate - aDate;
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.message || 'Failed to load bookings.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  markCompleted(booking: Booking): void {
    if (!confirm('Mark this booking as completed?')) return;
    this.completingId = booking.id;
    this.apiService.completeBooking(booking.id).subscribe({
      next: (updated) => {
        booking.status = updated.status;
        this.completingId = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        alert(err.message || 'Failed to mark as completed.');
        this.completingId = null;
        this.cdr.detectChanges();
      }
    });
  }

  statusClass(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
} 