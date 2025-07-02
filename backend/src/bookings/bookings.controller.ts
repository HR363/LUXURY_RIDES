import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './interfaces/booking.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('CUSTOMER', 'ADMIN', 'AGENT')
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req: Request): Promise<Booking> {
    return this.bookingsService.create({ ...createBookingDto, userId: (req as any).user.userId });
  }

  @Get()
  @Roles('ADMIN', 'AGENT', 'CUSTOMER')
  async findAll(@Request() req: Request): Promise<Booking[]> {
    return this.bookingsService.findAll((req as any).user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'AGENT')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Patch(':id/cancel')
  @Roles('CUSTOMER', 'ADMIN', 'AGENT')
  async cancel(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingsService.cancel(id);
  }

  @Patch(':id/approve')
  @Roles('ADMIN', 'AGENT')
  async approve(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingsService.approve(id);
  }

  @Patch(':id/reject')
  @Roles('ADMIN', 'AGENT')
  async reject(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingsService.reject(id);
  }

  @Patch(':id/complete')
  @Roles('ADMIN', 'AGENT')
  async complete(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingsService.complete(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingsService.remove(id);
  }
}
