import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @Roles('ADMIN', 'AGENT')
  async getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('stats')
  @Roles('ADMIN', 'AGENT')
  async getStats() {
    return this.dashboardService.getSummary();
  }
}
