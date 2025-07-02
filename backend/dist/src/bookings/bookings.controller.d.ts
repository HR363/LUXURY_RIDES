import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './interfaces/booking.interface';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto, req: Request): Promise<Booking>;
    findAll(req: Request): Promise<Booking[]>;
    findOne(id: number): Promise<Booking>;
    update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking>;
    cancel(id: number): Promise<Booking>;
    approve(id: number): Promise<Booking>;
    reject(id: number): Promise<Booking>;
    complete(id: number): Promise<Booking>;
    remove(id: number): Promise<Booking>;
}
