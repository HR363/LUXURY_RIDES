import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideIconComponent } from '../shared/lucide-icon.component';
import { VehicleCardComponent } from '../shared/vehicle-card.component';
import { ApiService } from '../services/api.service';
import { Vehicle, VehicleFilters } from '../types';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideIconComponent,
    VehicleCardComponent
  ],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class Vehicles implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  loading = false;
  error = '';
  
  filterForm: FormGroup;
  showFilters = false;
  
  categories = ['SUV', 'Sedan', 'Luxury', 'Economy', 'Van', 'Truck'];
  priceRanges = [
    { label: 'Any Price', value: [0, 10000] },
    { label: 'Under KES 2,000', value: [0, 2000] },
    { label: 'KES 2,000 - KES 5,000', value: [2000, 5000] },
    { label: 'KES 5,000 - KES 10,000', value: [5000, 10000] },
    { label: 'Over KES 10,000', value: [10000, 100000] }
  ];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      category: [''],
      priceRange: [''],
      isAvailable: [true]
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
    this.setupFilterListeners();
    this.loadQueryParams();
  }

  loadVehicles(): void {
    this.loading = true;
    this.error = '';
    
    this.apiService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load vehicles. Please try again.';
        this.loading = false;
        console.error('Error loading vehicles:', error);
      }
    });
  }

  setupFilterListeners(): void {
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['pickupLocation']) {
        this.filterForm.patchValue({
          search: params['pickupLocation']
        });
      }
    });
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const vehicleText = `${vehicle.make} ${vehicle.model} ${vehicle.category}`.toLowerCase();
        if (!vehicleText.includes(searchTerm)) {
          return false;
        }
      }
      
      // Category filter
      if (filters.category && vehicle.category !== filters.category) {
        return false;
      }
      
      // Price range filter
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange;
        const vehiclePrice = parseFloat(vehicle.pricePerDay);
        if (vehiclePrice < minPrice || vehiclePrice > maxPrice) {
          return false;
        }
      }
      
      // Availability filter
      if (filters.isAvailable !== null && vehicle.isAvailable !== filters.isAvailable) {
        return false;
      }
      
      return true;
    });
  }

  clearFilters(): void {
    this.filterForm.reset({
      search: '',
      category: '',
      priceRange: '',
      isAvailable: true
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    this.cdr.detectChanges();
  }

  getFilteredCount(): number {
    return this.filteredVehicles.length;
  }

  getTotalCount(): number {
    return this.vehicles.length;
  }
} 