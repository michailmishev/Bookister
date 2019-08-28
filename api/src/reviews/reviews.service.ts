import { Injectable } from '@nestjs/common';
import { Review } from 'src/data/entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/data/entities/book.entity';
import { User } from 'src/data/entities/user.entity';
import { ShowReviewDTO } from 'src/models/reviews/show-review.dto';
import { plainToClass } from 'class-transformer';
import { RatingTypeEnum } from 'src/common/enums/rating-type.enum';
import { RatingType } from 'src/data/entities/rating-type.entity';
import { CreateReviewDTO } from 'src/models/reviews/create-review.dto';
import { UserShowDTO } from 'src/models/user';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(RatingType) private readonly ratingTypesRepository: Repository<RatingType>,
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



    async checkForRatingTypesAndCreateThem(): Promise<void> {
        const ratingTypes = [ RatingTypeEnum.Awful, RatingTypeEnum.Bad, RatingTypeEnum.Average, RatingTypeEnum.Good, RatingTypeEnum.Excellent];
        await ratingTypes.forEach(async (ratingType: string) => {
            if (!(await this.ratingTypesRepository.findOne({ name: ratingType }))) {
                const ratingTypeToBeCreated = await this.ratingTypesRepository.create({ name: ratingType });
                await this.ratingTypesRepository.save(ratingTypeToBeCreated);
            }
        });
    }


    async createNewReview(createReview: CreateReviewDTO, bookId: string, user: UserShowDTO): Promise<ShowReviewDTO> {
        const reviewToBeCreated = await this.reviewsRepository.create(createReview);
        const bookOfTheReview = await this.booksRepository.findOne({ id: bookId, isDeleted: false });
        if (!bookOfTheReview) {
            return undefined;
        }
        const author = await this.usersRepository.findOne({ username: user.username });
        reviewToBeCreated.book = Promise.resolve(bookOfTheReview);
        reviewToBeCreated.user = Promise.resolve(author);
        const createdReview = await this.reviewsRepository.save(reviewToBeCreated);
        return this.createReviewDTO(createdReview);
    }





}
