import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
export declare class MailerService {
    private readonly mailerService;
    constructor(mailerService: NestMailerService);
    sendBookingConfirmation(to: string, context: Record<string, any>): Promise<void>;
    sendWelcomeEmail(to: string, context: Record<string, any>): Promise<void>;
    sendAdminNotification(to: string, subject: string, text: string): Promise<void>;
    sendThankYouEmail(to: string, context: {
        firstName: string;
        vehicle: string;
        startDate: string;
        endDate: string;
    }): Promise<void>;
    sendPasswordResetCode(to: string, code: string): Promise<void>;
}
