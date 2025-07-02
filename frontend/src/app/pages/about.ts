import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../shared/lucide-icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      bio: 'Passionate about revolutionizing the car rental industry in Kenya.'
    },
    {
      name: 'Jane Smith',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      bio: 'Ensuring smooth operations and exceptional customer service.'
    },
    {
      name: 'Mike Johnson',
      role: 'Fleet Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      bio: 'Maintaining our premium fleet to the highest standards.'
    }
  ];

  stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Premium Vehicles' },
    { number: '5', label: 'Years Experience' },
    { number: '24/7', label: 'Customer Support' }
  ];
} 