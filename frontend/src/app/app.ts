import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideIconComponent } from './shared/lucide-icon.component';
import { ThemeToggleComponent } from './shared/theme-toggle.component';
import { AuthService } from './services/auth.service';
import { User } from './types';
import { ToastComponent } from './shared/toast.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LucideIconComponent, ThemeToggleComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => this.currentUser = user);
  }

  logout() {
    this.authService.logout();
  }
}
