import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-6 right-6 z-50 flex flex-col gap-3">
      <div *ngFor="let toast of toasts" [ngClass]="toastClass(toast)" class="px-4 py-3 rounded-lg shadow-lg min-w-[220px] flex items-center gap-2 animate-fade-in">
        <span *ngIf="toast.type === 'success'" class="text-green-600">✔</span>
        <span *ngIf="toast.type === 'error'" class="text-red-600">✖</span>
        <span *ngIf="toast.type === 'info'" class="text-blue-600">ℹ</span>
        <span class="flex-1">{{ toast.message }}</span>
        <button (click)="dismiss(toast.id)" class="ml-2 text-gray-400 hover:text-gray-700">&times;</button>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(toasts => {
      console.log('ToastComponent toasts:', toasts);
      this.toasts = toasts;
    });
  }

  toastClass(toast: Toast) {
    switch (toast.type) {
      case 'success': return 'bg-green-50 border border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border border-red-200 text-red-800';
      case 'info': return 'bg-blue-50 border border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border border-gray-200';
    }
  }

  dismiss(id: number) {
    this.toastService.dismiss(id);
  }
} 