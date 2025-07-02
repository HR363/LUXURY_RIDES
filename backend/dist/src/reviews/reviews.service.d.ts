import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './interfaces/review.interface';
import { BookingsService } from '../bookings/bookings.service';
import { MailerService } from '../common/mailer.service';
import { UsersService } from '../users/users.service';
export declare class ReviewsService {
    private readonly prisma;
    private readonly bookingsService;
    private readonly mailerService;
    private readonly usersService;
    constructor(prisma: PrismaService, bookingsService: BookingsService, mailerService: MailerService, usersService: UsersService);
    create(createReviewDto: CreateReviewDto & {
        userId: number;
    }): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: number): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(id: number): Promise<Review>;
    findAllWithDetails(): Promise<({
        user: {
            id: number;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            phone: string;
            role: string;
            resetCode: string | null;
            resetCodeExpiresAt: Date | null;
        };
        vehicle: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            make: string;
            model: string;
            year: number;
            licensePlate: string;
            imageUrl: string;
            pricePerDay: import("@prisma/client/runtime/library").Decimal;
            isAvailable: boolean;
            category: string;
            features: string | null;
            locationId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        vehicleId: number;
        rating: number;
        comment: string | null;
    })[]>;
}
