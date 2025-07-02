"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VehiclesService = class VehiclesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createVehicleDto) {
        return this.prisma.vehicle.create({ data: createVehicleDto });
    }
    async findAll(query) {
        const { category, minPrice, maxPrice, locationId, isAvailable, page = 1, limit = 10, sortBy = 'id', order = 'asc', make, } = query || {};
        const where = {};
        if (category)
            where.category = category;
        if (locationId)
            where.locationId = locationId;
        if (isAvailable !== undefined)
            where.isAvailable = isAvailable === 'true';
        if (minPrice || maxPrice) {
            where.pricePerDay = {};
            if (minPrice)
                where.pricePerDay.gte = minPrice;
            if (maxPrice)
                where.pricePerDay.lte = maxPrice;
        }
        if (make)
            where.make = make;
        return this.prisma.vehicle.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { [sortBy]: order },
        });
    }
    async findOne(id) {
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        return vehicle;
    }
    async update(id, updateVehicleDto) {
        return this.prisma.vehicle.update({ where: { id }, data: updateVehicleDto });
    }
    async remove(id) {
        return this.prisma.vehicle.delete({ where: { id } });
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map