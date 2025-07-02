// Vehicle Types
export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  imageUrl: string;
  pricePerDay: string;
  isAvailable: boolean;
  category: string;
  features?: string | null;
  locationId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Types
export interface Booking {
  id: number;
  vehicleId: number;
  userId: number;
  startDate: string;
  endDate: string;
  pickupLocationId: number;
  dropoffLocationId: number;
  totalPrice: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
  vehicle?: Vehicle;
}

// User Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'ADMIN' | 'AGENT';
  phone?: string;
  address?: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface VehicleFilters {
  category?: string | string[];
  priceRange?: [number, number];
  isAvailable?: boolean;
  search?: string;
  make?: string;
  model?: string;
}

// Form Types
export interface BookingForm {
  vehicleId: number;
  startDate: string;
  endDate: string;
  pickupLocationId: number;
  dropoffLocationId: number;
  totalPrice: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

// Dashboard Stats
export interface DashboardStats {
  totalVehicles: number;
  availableVehicles: number;
  totalBookings: number;
  activeBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

// Location Types
export interface Location {
  id: number;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditableUser extends User {
  editRole: string;
} 