import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './interfaces/booking.interface';
import { MailerService } from '../common/mailer.service';
import { AuditLogService } from '../common/audit-log.service';
export declare class BookingsService {
    private readonly prisma;
    private readonly mailerService;
    private readonly auditLogService;
    constructor(prisma: PrismaService, mailerService: MailerService, auditLogService: AuditLogService);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(user: any): Promise<Booking[]>;
    findOne(id: number): Promise<Booking>;
    update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking>;
    remove(id: number): Promise<Booking>;
    cancel(id: number): Promise<Booking>;
    approve(id: number): Promise<Booking>;
    reject(id: number): Promise<Booking>;
    complete(id: number): Promise<Booking>;
}
