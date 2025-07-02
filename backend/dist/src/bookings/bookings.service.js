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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mailer_service_1 = require("../common/mailer.service");
const audit_log_service_1 = require("../common/audit-log.service");
let BookingsService = class BookingsService {
    prisma;
    mailerService;
    auditLogService;
    constructor(prisma, mailerService, auditLogService) {
        this.prisma = prisma;
        this.mailerService = mailerService;
        this.auditLogService = auditLogService;
    }
    async create(createBookingDto) {
        const booking = await this.prisma.booking.create({
            data: {
                vehicleId: createBookingDto.vehicleId,
                startDate: new Date(createBookingDto.startDate),
                endDate: new Date(createBookingDto.endDate),
                pickupLocationId: createBookingDto.pickupLocationId,
                dropoffLocationId: createBookingDto.dropoffLocationId,
                totalPrice: createBookingDto.totalPrice,
                status: createBookingDto.status,
                userId: createBookingDto.userId,
            }
        });
        const user = await this.prisma.user.findUnique({ where: { id: booking.userId } });
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id: booking.vehicleId } });
        try {
            if (user && vehicle) {
                await this.mailerService.sendBookingConfirmation(user.email, {
                    firstName: user.firstName,
                    vehicle: `${vehicle.make} ${vehicle.model}`,
                    startDate: booking.startDate.toISOString().split('T')[0],
                    endDate: booking.endDate.toISOString().split('T')[0],
                    totalPrice: booking.totalPrice,
                });
            }
        }
        catch (e) {
            console.error('Failed to send booking confirmation email:', e);
        }
        await this.auditLogService.logAction(booking.userId, 'CREATE', 'Booking', booking.id, `Booking created for vehicle ${booking.vehicleId}`);
        return booking;
    }
    async findAll(user) {
        if (user.role === 'ADMIN' || user.role === 'AGENT') {
            return this.prisma.booking.findMany({
                include: {
                    user: true,
                    vehicle: true
                }
            });
        }
        else {
            return this.prisma.booking.findMany({
                where: { userId: user.userId },
                include: {
                    user: true,
                    vehicle: true
                }
            });
        }
    }
    async findOne(id) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return booking;
    }
    async update(id, updateBookingDto) {
        return this.prisma.booking.update({ where: { id }, data: updateBookingDto });
    }
    async remove(id) {
        return this.prisma.booking.delete({ where: { id } });
    }
    async cancel(id) {
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
    }
    async approve(id) {
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'CONFIRMED' },
        });
    }
    async reject(id) {
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
    }
    async complete(id) {
        const booking = await this.prisma.booking.update({
            where: { id },
            data: { status: 'COMPLETED' },
        });
        const user = await this.prisma.user.findUnique({ where: { id: booking.userId } });
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id: booking.vehicleId } });
        if (user && vehicle) {
            await this.mailerService.sendThankYouEmail(user.email, {
                firstName: user.firstName,
                vehicle: `${vehicle.make} ${vehicle.model}`,
                startDate: booking.startDate.toISOString().split('T')[0],
                endDate: booking.endDate.toISOString().split('T')[0],
            });
        }
        return booking;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.MailerService,
        audit_log_service_1.AuditLogService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map