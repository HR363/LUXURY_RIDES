import { AuditLogService } from './audit-log.service';
export declare class AuditLogController {
    private readonly auditLogService;
    constructor(auditLogService: AuditLogService);
    findAll(page?: number, limit?: number, userId?: number, action?: string, resource?: string): Promise<{
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
