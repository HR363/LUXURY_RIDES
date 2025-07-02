import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../shared/lucide-icon.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class FAQ {
  faqs = [
    {
      question: 'What documents do I need to rent a car?',
      answer: 'You need a valid driver\'s license, national ID or passport, and a credit card for the security deposit. International drivers need an International Driving Permit.',
      isOpen: false
    },
    {
      question: 'What is the minimum age to rent a car?',
      answer: 'The minimum age to rent a car is 21 years old. Drivers under 25 may be subject to additional fees.',
      isOpen: false
    },
    {
      question: 'How far in advance should I book a car?',
      answer: 'We recommend booking at least 24-48 hours in advance, especially during peak seasons. For special vehicles or long-term rentals, book 1-2 weeks ahead.',
      isOpen: false
    },
    {
      question: 'What happens if I return the car late?',
      answer: 'Late returns may incur additional charges. Please contact us immediately if you need to extend your rental period.',
      isOpen: false
    },
    {
      question: 'Is insurance included in the rental price?',
      answer: 'Basic insurance is included, but we recommend additional coverage for comprehensive protection. Our staff can explain all insurance options.',
      isOpen: false
    },
    {
      question: 'Can I pick up and drop off at different locations?',
      answer: 'Yes, we offer one-way rentals between our locations. Additional fees may apply depending on the distance.',
      isOpen: false
    },
    {
      question: 'What fuel policy do you have?',
      answer: 'We provide the car with a full tank and expect it returned with a full tank. Fuel charges apply if returned with less fuel.',
      isOpen: false
    },
    {
      question: 'Do you offer airport pickup and drop-off?',
      answer: 'Yes, we provide airport pickup and drop-off services at major airports in Kenya. Please book this service in advance.',
      isOpen: false
    },
    {
      question: 'What if the car breaks down during my rental?',
      answer: 'All our vehicles are well-maintained, but if you experience any issues, contact our 24/7 support line immediately. We\'ll arrange assistance or a replacement vehicle.',
      isOpen: false
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking up to 24 hours before pickup. Cancellation fees may apply for late cancellations.',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
} 