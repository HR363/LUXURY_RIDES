import { Injectable, NotFoundException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './interfaces/review.interface';
import { BookingsService } from '../bookings/bookings.service';
import { MailerService } from '../common/mailer.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookingsService: BookingsService,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  async create(createReviewDto: CreateReviewDto & { userId: number }): Promise<Review> {
    // Check if user has booked the vehicle
    const hasBooking = await this.prisma.booking.findFirst({
      where: {
        userId: createReviewDto.userId,
        vehicleId: createReviewDto.vehicleId,
        status: { in: ['CONFIRMED', 'COMPLETED'] },
      },
    });
    if (!hasBooking) {
      throw new ForbiddenException('You can only review vehicles you have booked.');
    }
    const review = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        rating: Number(createReviewDto.rating),
      },
    });
    return review;
  }

  async findAll(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.prisma.review.update({ where: { id }, data: updateReviewDto });
  }

  async remove(id: number): Promise<Review> {
    return this.prisma.review.delete({ where: { id } });
  }

  async findAllWithDetails() {
    return this.prisma.review.findMany({
      include: {
        user: true,
        vehicle: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
