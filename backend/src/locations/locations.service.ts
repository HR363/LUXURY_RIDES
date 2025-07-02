import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './interfaces/location.interface';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    return this.prisma.location.create({ data: createLocationDto });
  }

  async findAll(): Promise<Location[]> {
    return this.prisma.location.findMany();
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.prisma.location.findUnique({ where: { id } });
    if (!location) throw new NotFoundException('Location not found');
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location> {
    return this.prisma.location.update({ where: { id }, data: updateLocationDto });
  }

  async remove(id: number): Promise<Location> {
    return this.prisma.location.delete({ where: { id } });
  }
}
