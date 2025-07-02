import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerModule } from '../common/mailer.module';
import { AuditLogService } from '../common/audit-log.service';

@Module({
  imports: [
    PrismaModule,
    MailerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuditLogService],
  exports: [UsersService],
})
export class UsersModule {}
