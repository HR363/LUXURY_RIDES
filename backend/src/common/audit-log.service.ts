import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async logAction(
    userId: number | null,
    action: string,
    resource: string,
    resourceId?: number,
    details?: string,
  ) {
    await this.prisma.auditLog.create({
      data: {
        userId,
        action,
        resource,
        resourceId,
        details,
      },
    });
  }

  async findAll({ page = 1, limit = 20, userId, action, resource }: {
    page?: number;
    limit?: number;
    userId?: number;
    action?: string;
    resource?: string;
  }) {
    const where: Record<string, any> = {};
    if (userId) where.userId = userId;
    if (action) where.action = action;
    if (resource) where.resource = resource;
    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);
    return { data, total, page, limit };
  }
} 