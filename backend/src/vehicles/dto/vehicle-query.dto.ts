import { IsOptional, IsString, IsInt, IsBooleanString, IsNumberString, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class VehicleQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumberString()
  minPrice?: string;

  @IsOptional()
  @IsNumberString()
  maxPrice?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  locationId?: number;

  @IsOptional()
  @IsBooleanString()
  isAvailable?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  make?: string;
} 