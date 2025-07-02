import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const [
      totalVehicles,
      totalBookings,
      totalRevenueObj,
      totalCustomers,
      bookingsPerStatus,
    ] = await Promise.all([
      this.prisma.vehicle.count(),
      this.prisma.booking.count(),
      this.prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: { status: 'COMPLETED' },
      }),
      this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
      this.prisma.booking.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    return {
      totalVehicles,
      totalBookings,
      totalRevenue: totalRevenueObj._sum.totalPrice || 0,
      totalCustomers,
      bookingsPerStatus: bookingsPerStatus.map(
        (b: { status: string; _count: { status: number } }) => ({ status: b.status, count: b._count.status })
      ),
    };
  }
}
