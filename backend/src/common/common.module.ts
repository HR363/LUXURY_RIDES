import { Module } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { MailerService } from './mailer.service';

@Module({
  providers: [AuditLogService, MailerService],
  exports: [AuditLogService, MailerService],
})
export class CommonModule {} 