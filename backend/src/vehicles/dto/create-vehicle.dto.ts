import { IsString, IsInt, IsBoolean, IsOptional, IsNumberString, IsIn } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsString()
  licensePlate: string;

  @IsString()
  imageUrl: string;

  @IsNumberString()
  pricePerDay: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsIn(['LUXURY', 'SUV', 'SPORTS', 'MODIFIED', 'VAN', 'ELECTRIC'])
  category: string;

  @IsString()
  @IsOptional()
  features?: string; // JSON string

  @IsInt()
  locationId: number;
} 