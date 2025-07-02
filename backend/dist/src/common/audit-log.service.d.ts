import { PrismaService } from '../prisma/prisma.service';
export declare class AuditLogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logAction(userId: number | null, action: string, resource: string, resourceId?: number, details?: string): Promise<void>;
    findAll({ page, limit, userId, action, resource }: {
        page?: number;
        limit?: number;
        userId?: number;
        action?: string;
        resource?: string;
    }): Promise<{
        data: {
            id: number;
            createdAt: Date;
            userId: number | null;
            action: string;
            resource: string;
            resourceId: number | null;
            details: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
