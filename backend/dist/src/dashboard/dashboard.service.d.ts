import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        totalVehicles: number;
        totalBookings: number;
        totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        totalCustomers: number;
        bookingsPerStatus: {
            status: string;
            count: number;
        }[];
    }>;
}
