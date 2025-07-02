import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, User } from '../types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.apiService.login(credentials).pipe(
      tap(response => {
        this.setAuthData(response.access_token, response.user);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isAgent(): boolean {
    return this.hasRole('AGENT');
  }

  isCustomer(): boolean {
    return this.hasRole('CUSTOMER');
  }

  private setAuthData(token: string, user: User): void {
    localStorage.setItem('access_token', token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuthData(): void {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    if (token) {
      // Validate token and get user info
      this.apiService.getCurrentUser().pipe(
        tap(user => {
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(() => {
          this.clearAuthData();
          return of(null);
        })
      ).subscribe();
    }
  }

  forgotPassword(email: string) {
    return this.apiService.forgotPassword(email);
  }

  resetPassword(email: string, code: string, newPassword: string) {
    return this.apiService.resetPassword(email, code, newPassword);
  }
} 