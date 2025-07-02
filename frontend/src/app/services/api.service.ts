import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { 
  Vehicle, 
  Booking, 
  User, 
  LoginRequest, 
  LoginResponse, 
  VehicleFilters, 
  BookingForm,
  DashboardStats,
  ApiResponse,
  PaginatedResponse
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly apiUrl = `${this.baseUrl}/api`;

  constructor(private http: HttpClient) {}

  // Private helper methods
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.error?.message || 'An error occurred'));
  }

  // Auth endpoints
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData)
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {}, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  // Vehicle endpoints
  getVehicles(filters?: VehicleFilters): Observable<Vehicle[]> {
    let params = new HttpParams();

    if (filters) {
      // Only send a single category string if present
      if (filters.category && typeof filters.category === 'string') {
        params = params.set('category', filters.category);
      } else if (Array.isArray(filters.category) && filters.category.length > 0) {
        params = params.set('category', filters.category[0]);
      }
      if (filters.priceRange) {
        params = params.set('minPrice', filters.priceRange[0].toString());
        params = params.set('maxPrice', filters.priceRange[1].toString());
      }
      if (filters.isAvailable !== undefined) {
        params = params.set('isAvailable', filters.isAvailable.toString());
      }
      // Only send make/model/category as separate params if searching
      if (filters.make) {
        params = params.set('make', filters.make);
      }
      if (filters.model) {
        params = params.set('model', filters.model);
      }
      if (filters.search) {
        // Optionally map search to make/model/category if needed
        params = params.set('make', filters.search);
      }
    }

    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles`, { params })
      .pipe(catchError(this.handleError));
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicles/${id}`)
      .pipe(catchError(this.handleError));
  }

  createVehicle(vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/vehicles`, vehicle, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  updateVehicle(id: number, vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.apiUrl}/vehicles/${id}`, vehicle, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vehicles/${id}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  uploadVehicleImage(formData: FormData): Observable<{ imageUrl: string }> {
    const token = localStorage.getItem('access_token');
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/vehicles/upload-image`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  // Booking endpoints
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${id}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  createBooking(booking: BookingForm): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  updateBooking(id: number, booking: Partial<Booking>): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/bookings/${id}`, booking, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  cancelBooking(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/bookings/${id}/cancel`, {}, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  approveBooking(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/bookings/${id}/approve`, {}, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  rejectBooking(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/bookings/${id}/reject`, {}, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  completeBooking(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/bookings/${id}/complete`, {}, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  // User endpoints
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  updateProfile(user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/me`, user, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  updateUserRole(id: number, role: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}`, { role }, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  // Dashboard endpoints
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  // Admin endpoints
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/admin/bookings`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getAllAdminReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/reviews`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  // Location endpoints
  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/locations`)
      .pipe(catchError(this.handleError));
  }

  // Review endpoints
  getReviews(vehicleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews?vehicleId=${vehicleId}`)
      .pipe(catchError(this.handleError));
  }

  addReview(vehicleId: number, rating: number, comment?: string): Observable<any> {
    const body: any = { vehicleId, rating };
    if (comment) body.comment = comment;
    return this.http.post<any>(`${this.apiUrl}/reviews`, body, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reviews/${reviewId}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  // Forgot Password
  forgotPassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  // Reset Password
  resetPassword(email: string, code: string, newPassword: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password`, { email, code, newPassword });
  }
} 