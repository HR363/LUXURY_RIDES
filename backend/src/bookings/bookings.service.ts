import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './interfaces/booking.interface';
import { MailerService } from '../common/mailer.service';
import { AuditLogService } from '../common/audit-log.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
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
    // Fetch user and vehicle for email context
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
    } catch (e) {
      console.error('Failed to send booking confirmation email:', e);
      // Continue without throwing
    }
    // Log booking creation
    await this.auditLogService.logAction(
      booking.userId,
      'CREATE',
      'Booking',
      booking.id,
      `Booking created for vehicle ${booking.vehicleId}`
    );
    return booking;
  }

  async findAll(user: any): Promise<Booking[]> {
    if (user.role === 'ADMIN' || user.role === 'AGENT') {
      return this.prisma.booking.findMany({
        include: {
          user: true,
          vehicle: true
        }
      });
    } else {
      return this.prisma.booking.findMany({
        where: { userId: user.userId },
        include: {
          user: true,
          vehicle: true
        }
      });
    }
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    return this.prisma.booking.update({ where: { id }, data: updateBookingDto });
  }

  async remove(id: number): Promise<Booking> {
    return this.prisma.booking.delete({ where: { id } });
  }

  async cancel(id: number): Promise<Booking> {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async approve(id: number): Promise<Booking> {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CONFIRMED' },
    });
  }

  async reject(id: number): Promise<Booking> {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async complete(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });
    // Fetch user and vehicle for thank you email
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
}
