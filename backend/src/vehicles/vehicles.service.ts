import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './interfaces/vehicle.interface';
import { VehicleQueryDto } from './dto/vehicle-query.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.prisma.vehicle.create({ data: createVehicleDto });
  }

  async findAll(query?: VehicleQueryDto): Promise<Vehicle[]> {
    const {
      category,
      minPrice,
      maxPrice,
      locationId,
      isAvailable,
      page = 1,
      limit = 10,
      sortBy = 'id',
      order = 'asc',
      make,
    } = query || {};

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (locationId) where.locationId = locationId;
    if (isAvailable !== undefined) where.isAvailable = isAvailable === 'true';
    if (minPrice || maxPrice) {
      where.pricePerDay = {};
      if (minPrice) (where.pricePerDay as any).gte = minPrice;
      if (maxPrice) (where.pricePerDay as any).lte = maxPrice;
    }
    if (make) where.make = make;

    return this.prisma.vehicle.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
    });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.prisma.vehicle.update({ where: { id }, data: updateVehicleDto });
  }

  async remove(id: number): Promise<Vehicle> {
    return this.prisma.vehicle.delete({ where: { id } });
  }
}
