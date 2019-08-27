import { Injectable } from '@nestjs/common';
import { Review } from 'src/data/entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/data/entities/book.entity';
import { User } from 'src/data/entities/user.entity';
import { ShowReviewDTO } from 'src/models/reviews/show-review.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) { }


    async createReviewDTO(review: Review): Promise<ShowReviewDTO> {
        const reviewDTO = {
            id: review.id,
            user: await review.user,
            rating: review.rating,
            comment: review.comment,
            timestamp: review.timestamp,
        };
        return await plainToClass(ShowReviewDTO, reviewDTO);
    }




}
