import { UsersService } from './users/users.service';
import { BookingsService } from './bookings/bookings.service';
import { ReviewsService } from './reviews/reviews.service';
export declare class AdminController {
    private readonly usersService;
    private readonly bookingsService;
    private readonly reviewsService;
    constructor(usersService: UsersService, bookingsService: BookingsService, reviewsService: ReviewsService);
    getAllUsers(): Promise<import("./users/interfaces/user.interface").User[]>;
    getAllBookings(req: Request): Promise<import("./bookings/interfaces/booking.interface").Booking[]>;
    getAllReviews(): Promise<({
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
