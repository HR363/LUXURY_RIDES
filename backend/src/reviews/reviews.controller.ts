import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './interfaces/review.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles('CUSTOMER')
  async create(@Body() createReviewDto: CreateReviewDto, @Request() req: any): Promise<Review> {
    const userId = req.user.userId;
    return this.reviewsService.create({ ...createReviewDto, userId });
  }

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  @Roles('CUSTOMER', 'ADMIN')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    return this.reviewsService.remove(id);
  }
}
