import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LucideIconComponent } from './lucide-icon.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Vehicle } from '../types';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  template: `
    <div 
      class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
      (click)="navigateToDetail()"
    >
      <!-- Image Container -->
      <div class="relative overflow-hidden">
        <img 
          [src]="vehicle.imageUrl" 
          [alt]="vehicle.make + ' ' + vehicle.model" 
          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        >
        
        <!-- Availability Badge -->
        <div class="absolute top-3 right-3">
          <span 
            [class]="vehicle.isAvailable 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'" 
            class="px-2 py-1 rounded-full text-xs font-medium"
          >
            {{ vehicle.isAvailable ? 'Available' : 'Unavailable' }}
          </span>
        </div>

        <!-- Category Badge -->
        <div class="absolute top-3 left-3">
          <span class="bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            {{ vehicle.category }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <!-- Vehicle Info -->
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">
            {{ vehicle.make }} {{ vehicle.model }}
          </h3>
          <p class="text-sm text-gray-500">{{ vehicle.year }} • {{ vehicle.licensePlate }}</p>
        </div>

        <!-- Features -->
        <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div class="flex items-center gap-1">
            <app-lucide-icon name="User" class="w-4 h-4"></app-lucide-icon>
            <span>5 seats</span>
          </div>
          <div class="flex items-center gap-1">
            <app-lucide-icon name="Car" class="w-4 h-4"></app-lucide-icon>
            <span>Auto</span>
          </div>
        </div>

        <!-- Price -->
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="text-2xl font-bold text-accent">KES {{ parseFloat(vehicle.pricePerDay) | number }}</span>
            <span class="text-sm text-gray-500">/ day</span>
          </div>
          <div class="flex items-center gap-1 text-yellow-500">
            <app-lucide-icon name="Star" class="w-4 h-4 fill-current"></app-lucide-icon>
            <span class="text-sm font-medium">4.8</span>
          </div>
        </div>

        <!-- Action Button -->
        <button 
          class="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          (click)="navigateToDetail($event)"
        >
          <app-lucide-icon name="Search" class="w-4 h-4"></app-lucide-icon>
          View Details
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;

  constructor(private router: Router) {}

  navigateToDetail(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.router.navigate(['/vehicles', this.vehicle.id]);
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }
}
