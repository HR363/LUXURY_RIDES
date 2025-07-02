import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private idCounter = 0;

  constructor(private zone: NgZone) {}

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) {
    console.log('ToastService.show called:', message, type);
    this.zone.run(() => {
      const id = ++this.idCounter;
      const toast: Toast = { message, type, id };
      this.toastsSubject.next([...this.toastsSubject.value, toast]);
      setTimeout(() => this.dismiss(id), duration);
    });
  }

  dismiss(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }
} 