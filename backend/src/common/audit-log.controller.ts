import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @Roles('ADMIN')
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('userId') userId?: number,
    @Query('action') action?: string,
    @Query('resource') resource?: string,
  ) {
    return this.auditLogService.findAll({ page: Number(page), limit: Number(limit), userId, action, resource });
  }
}
