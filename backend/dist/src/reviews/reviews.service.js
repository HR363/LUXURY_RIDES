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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bookings_service_1 = require("../bookings/bookings.service");
const mailer_service_1 = require("../common/mailer.service");
const users_service_1 = require("../users/users.service");
let ReviewsService = class ReviewsService {
    prisma;
    bookingsService;
    mailerService;
    usersService;
    constructor(prisma, bookingsService, mailerService, usersService) {
        this.prisma = prisma;
        this.bookingsService = bookingsService;
        this.mailerService = mailerService;
        this.usersService = usersService;
    }
    async create(createReviewDto) {
        const hasBooking = await this.prisma.booking.findFirst({
            where: {
                userId: createReviewDto.userId,
                vehicleId: createReviewDto.vehicleId,
                status: { in: ['CONFIRMED', 'COMPLETED'] },
            },
        });
        if (!hasBooking) {
            throw new common_1.ForbiddenException('You can only review vehicles you have booked.');
        }
        const review = await this.prisma.review.create({
            data: {
                ...createReviewDto,
                rating: Number(createReviewDto.rating),
            },
        });
        return review;
    }
    async findAll() {
        return this.prisma.review.findMany();
    }
    async findOne(id) {
        const review = await this.prisma.review.findUnique({ where: { id } });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        return review;
    }
    async update(id, updateReviewDto) {
        return this.prisma.review.update({ where: { id }, data: updateReviewDto });
    }
    async remove(id) {
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
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bookings_service_1.BookingsService,
        mailer_service_1.MailerService,
        users_service_1.UsersService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map