export interface Review {
  id: number;
  rating: number;
  comment?: string | null;
  userId: number;
  vehicleId: number;
  createdAt: Date;
  updatedAt: Date;
} 