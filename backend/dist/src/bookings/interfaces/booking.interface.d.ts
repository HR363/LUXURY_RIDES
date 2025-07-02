import { Decimal } from '@prisma/client/runtime/library';
export interface Booking {
    id: number;
    bookingDate: Date;
    startDate: Date;
    endDate: Date;
    totalPrice: string | Decimal;
    status: string;
    userId: number;
    vehicleId: number;
    pickupLocationId: number;
    dropoffLocationId: number;
    createdAt: Date;
    updatedAt: Date;
}
