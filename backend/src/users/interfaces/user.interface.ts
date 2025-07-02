export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  resetCode?: string | null;
  resetCodeExpiresAt?: Date | null;
} 