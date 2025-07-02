import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './interfaces/location.interface';
export declare class LocationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLocationDto: CreateLocationDto): Promise<Location>;
    findAll(): Promise<Location[]>;
    findOne(id: number): Promise<Location>;
    update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location>;
    remove(id: number): Promise<Location>;
}
