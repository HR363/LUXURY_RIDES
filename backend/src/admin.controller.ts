import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { BookingsService } from './bookings/bookings.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { ReviewsService } from './reviews/reviews.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly bookingsService: BookingsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Get('users')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('bookings')
  async getAllBookings(@Request() req: Request) {
    return this.bookingsService.findAll((req as any).user);
  }

  @Get('reviews')
  async getAllReviews() {
    return this.reviewsService.findAllWithDetails();
  }
} 