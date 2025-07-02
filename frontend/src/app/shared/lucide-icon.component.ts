import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lucide-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Car Icon -->
    <svg 
      *ngIf="name === 'Car'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M14 16H9m11 0h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1m-6 0H8a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1m6 0v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1m6 0H8"/>
    </svg>
    
    <!-- Search Icon -->
    <svg 
      *ngIf="name === 'Search'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
    
    <!-- Shield Icon -->
    <svg 
      *ngIf="name === 'Shield'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    </svg>
    
    <!-- Clock Icon -->
    <svg 
      *ngIf="name === 'Clock'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
    
    <!-- CreditCard Icon -->
    <svg 
      *ngIf="name === 'CreditCard'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
    
    <!-- ArrowRight Icon -->
    <svg 
      *ngIf="name === 'ArrowRight'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
    
    <!-- ChevronUp Icon -->
    <svg 
      *ngIf="name === 'ChevronUp'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="m18 15-6-6-6 6"/>
    </svg>
    
    <!-- ChevronDown Icon -->
    <svg 
      *ngIf="name === 'ChevronDown'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
    
    <!-- Phone Icon -->
    <svg 
      *ngIf="name === 'Phone'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
    
    <!-- Mail Icon -->
    <svg 
      *ngIf="name === 'Mail'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
    
    <!-- MessageCircle Icon -->
    <svg 
      *ngIf="name === 'MessageCircle'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    
    <!-- User Icon -->
    <svg 
      *ngIf="name === 'User'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    
    <!-- Lock Icon -->
    <svg 
      *ngIf="name === 'Lock'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
    
    <!-- Eye Icon -->
    <svg 
      *ngIf="name === 'Eye'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    
    <!-- EyeOff Icon -->
    <svg 
      *ngIf="name === 'EyeOff'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
      <line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
    
    <!-- LogIn Icon -->
    <svg 
      *ngIf="name === 'LogIn'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10,17 15,12 10,7"/>
      <line x1="15" x2="3" y1="12" y2="12"/>
    </svg>
    
    <!-- Chrome Icon -->
    <svg 
      *ngIf="name === 'Chrome'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="4"/>
      <line x1="21.17" x2="12" y1="8" y2="8"/>
      <line x1="3.95" x2="8.54" y1="6.06" y2="14"/>
      <line x1="10.88" x2="15.46" y1="21.94" y2="14"/>
    </svg>
    
    <!-- Facebook Icon -->
    <svg 
      *ngIf="name === 'Facebook'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
    
    <!-- UserPlus Icon -->
    <svg 
      *ngIf="name === 'UserPlus'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="m22 10-6-6"/>
      <path d="m16 10 6-6"/>
    </svg>
    
    <!-- AlertCircle Icon -->
    <svg 
      *ngIf="name === 'AlertCircle'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" x2="12" y1="8" y2="12"/>
      <line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
    
    <!-- CheckCircle Icon -->
    <svg 
      *ngIf="name === 'CheckCircle'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
    
    <!-- Target Icon -->
    <svg 
      *ngIf="name === 'Target'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
    
    <!-- Heart Icon -->
    <svg 
      *ngIf="name === 'Heart'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
    
    <!-- Star Icon -->
    <svg 
      *ngIf="name === 'Star'" 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="class"
      [attr.aria-label]="ariaLabel"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LucideIconComponent {
  @Input() name!: string;
  @Input() size: string | number = '1em';
  @Input() class = '';
  @Input('aria-label') ariaLabel?: string;
} 