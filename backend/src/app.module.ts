import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LocationsModule } from './locations/locations.module';
import { BookingsModule } from './bookings/bookings.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, UsersModule, AuthModule, VehiclesModule, BookingsModule, LocationsModule, ReviewsModule, DashboardModule, AdminModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
