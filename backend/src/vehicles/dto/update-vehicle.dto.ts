import { IsString, IsInt, IsBoolean, IsOptional, IsNumberString, IsIn } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  make?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  licensePlate?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumberString()
  @IsOptional()
  pricePerDay?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  @IsIn(['LUXURY', 'SUV', 'SPORTS', 'MODIFIED', 'VAN', 'ELECTRIC'])
  category?: string;

  @IsString()
  @IsOptional()
  features?: string;

  @IsInt()
  @IsOptional()
  locationId?: number;
} 