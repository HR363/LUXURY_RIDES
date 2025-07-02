"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailerService = class MailerService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendBookingConfirmation(to, context) {
        console.log('Sending booking confirmation email:', { to, context });
        await this.mailerService.sendMail({
            to,
            subject: 'Booking Confirmation',
            template: 'booking-confirmation',
            context,
        });
    }
    async sendWelcomeEmail(to, context) {
        console.log('Sending welcome email:', { to, context });
        await this.mailerService.sendMail({
            to,
            subject: 'Welcome to Car Rental!',
            template: 'welcome',
            context,
        });
    }
    async sendAdminNotification(to, subject, text) {
        console.log('Sending admin notification email:', { to, subject, text });
        await this.mailerService.sendMail({
            to,
            subject,
            template: 'admin-notification',
            context: { subject, text },
        });
    }
    async sendThankYouEmail(to, context) {
        console.log('Sending thank you email:', { to, context });
        await this.mailerService.sendMail({
            to,
            subject: 'Thank You for Your Booking!',
            template: 'thank-you',
            context,
        });
    }
    async sendPasswordResetCode(to, code) {
        console.log('Sending password reset code email:', { to, code });
        await this.mailerService.sendMail({
            to,
            subject: 'Password Reset Code',
            template: 'password-reset-code',
            context: { code },
        });
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map