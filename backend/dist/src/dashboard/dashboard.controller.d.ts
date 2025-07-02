import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
    getStats(): Promise<{
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
