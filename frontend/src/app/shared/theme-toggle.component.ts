import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="toggleTheme()"
      [attr.aria-label]="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      class="p-2 rounded-full border border-gray-300 bg-white dark:bg-slate-800 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
    >
      <span *ngIf="!isDark" aria-hidden="true">🌙</span>
      <span *ngIf="isDark" aria-hidden="true">☀️</span>
    </button>
  `,
})
export class ThemeToggleComponent implements OnInit {
  isDark = false;

  ngOnInit() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      this.isDark = true;
      document.documentElement.classList.add('dark');
    } else {
      this.isDark = false;
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
} 