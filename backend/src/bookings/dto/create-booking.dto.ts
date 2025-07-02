import { IsDateString, IsInt, IsString, IsNumberString, IsIn } from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumberString()
  totalPrice: string;

  @IsString()
  @IsIn(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
  status: string;

  @IsInt()
  userId: number;

  @IsInt()
  vehicleId: number;

  @IsInt()
  pickupLocationId: number;

  @IsInt()
  dropoffLocationId: number;
} 