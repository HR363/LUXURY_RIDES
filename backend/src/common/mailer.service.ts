import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendBookingConfirmation(to: string, context: Record<string, any>) {
    console.log('Sending booking confirmation email:', { to, context });
    await this.mailerService.sendMail({
      to,
      subject: 'Booking Confirmation',
      template: 'booking-confirmation',
      context,
    });
  }

  async sendWelcomeEmail(to: string, context: Record<string, any>) {
    console.log('Sending welcome email:', { to, context });
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Car Rental!',
      template: 'welcome',
      context,
    });
  }

  async sendAdminNotification(to: string, subject: string, text: string) {
    console.log('Sending admin notification email:', { to, subject, text });
    await this.mailerService.sendMail({
      to,
      subject,
      template: 'admin-notification',
      context: { subject, text },
    });
  }

  async sendThankYouEmail(to: string, context: { firstName: string, vehicle: string, startDate: string, endDate: string }) {
    console.log('Sending thank you email:', { to, context });
    await this.mailerService.sendMail({
      to,
      subject: 'Thank You for Your Booking!',
      template: 'thank-you',
      context,
    });
  }

  async sendPasswordResetCode(to: string, code: string) {
    console.log('Sending password reset code email:', { to, code });
    await this.mailerService.sendMail({
      to,
      subject: 'Password Reset Code',
      template: 'password-reset-code',
      context: { code },
    });
  }
} 