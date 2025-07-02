import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './interfaces/vehicle.interface';
import { VehicleQueryDto } from './dto/vehicle-query.dto';
import { CloudinaryService } from '../common/cloudinary.service';
export declare class VehiclesController {
    private readonly vehiclesService;
    private readonly cloudinaryService;
    constructor(vehiclesService: VehiclesService, cloudinaryService: CloudinaryService);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(query: VehicleQueryDto): Promise<Vehicle[]>;
    findOne(id: number): Promise<Vehicle>;
    update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: number): Promise<Vehicle>;
    uploadImage(file: Express.Multer.File): Promise<{
        imageUrl: string;
    }>;
}
