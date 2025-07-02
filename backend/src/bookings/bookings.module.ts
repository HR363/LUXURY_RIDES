import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerModule } from '../common/mailer.module';
import { AuditLogService } from '../common/audit-log.service';

@Module({
  imports: [PrismaModule, MailerModule],
  controllers: [BookingsController],
  providers: [BookingsService, AuditLogService],
  exports: [BookingsService],
})
export class BookingsModule {}
