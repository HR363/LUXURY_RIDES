import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './interfaces/vehicle.interface';
import { VehicleQueryDto } from './dto/vehicle-query.dto';
export declare class VehiclesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(query?: VehicleQueryDto): Promise<Vehicle[]>;
    findOne(id: number): Promise<Vehicle>;
    update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: number): Promise<Vehicle>;
}
