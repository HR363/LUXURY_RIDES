import { Decimal } from '@prisma/client/runtime/library';
export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  imageUrl: string;
  pricePerDay: string | Decimal;
  isAvailable: boolean;
  category: string;
  features?: string | null;
  locationId: number;
  createdAt: Date;
  updatedAt: Date;
} 