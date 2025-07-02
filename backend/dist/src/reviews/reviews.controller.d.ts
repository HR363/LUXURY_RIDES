import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './interfaces/review.interface';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto, req: any): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: number): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(id: number): Promise<Review>;
}
