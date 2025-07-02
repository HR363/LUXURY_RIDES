import { IsDateString, IsInt, IsString, IsNumberString, IsIn, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsNumberString()
  @IsOptional()
  totalPrice?: string;

  @IsString()
  @IsIn(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
  @IsOptional()
  status?: string;

  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @IsOptional()
  vehicleId?: number;

  @IsInt()
  @IsOptional()
  pickupLocationId?: number;

  @IsInt()
  @IsOptional()
  dropoffLocationId?: number;
} 