import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsService } from './reviews/reviews.service';
import { MailerModule } from './common/mailer.module';

@Module({
  imports: [UsersModule, BookingsModule, ReviewsModule, MailerModule],
  controllers: [AdminController],
  providers: [ReviewsService],
})
export class AdminModule {} 