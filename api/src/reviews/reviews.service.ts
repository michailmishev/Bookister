import { Injectable } from '@nestjs/common';
import { Review } from 'src/data/entities/review.entity';
import { Repository, Brackets } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/data/entities/book.entity';
import { User } from '../data/entities/user.entity';
import { ShowReviewDTO } from 'src/models/reviews/show-review.dto';
import { plainToClass } from 'class-transformer';
// import { RatingTypeEnum } from 'src/common/enums/rating-type.enum';
// import { RatingType } from 'src/data/entities/rating-type.entity';
import { CreateReviewDTO } from 'src/models/reviews/create-review.dto';
import { UserShowDTO } from 'src/models/user';
import { LibraryEvent } from 'src/data/entities/library-event.entity';
import { RatingTypeEnum } from 'src/common/enums/rating-type.enum';
import { UserAlloweToReview } from 'src/data/entities/user-allowed-to-review.entity';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(LibraryEvent) private readonly libraryEventRepository: Repository<LibraryEvent>,
        // @InjectRepository(RatingType) private readonly ratingTypesRepository: Repository<RatingType>,
        // -----------------------------------
        @InjectRepository(UserAlloweToReview) private readonly reviewPermissionRepository: Repository<UserAlloweToReview>,
        // -------------------------------------

    ) { }

    async createReviewDTO(review: Review): Promise<ShowReviewDTO> {
        const reviewDTO = {
            id: review.id,
            user: await review.user,
            ratingType: review.ratingType,              //ratingType
            comment: review.comment,
            timestamp: review.timestamp,
        };
        return await plainToClass(ShowReviewDTO, reviewDTO);
    }

    // async checkForRatingTypesAndCreateThem(): Promise<void> {
    //     const ratingTypes = [ RatingTypeEnum.Awful, RatingTypeEnum.Bad, RatingTypeEnum.Average, RatingTypeEnum.Good, RatingTypeEnum.Excellent];
    //     await ratingTypes.forEach(async (ratingType: string) => {
    //         if (!(await this.ratingTypesRepository.findOne({ name: ratingType }))) {
    //             const ratingTypeToBeCreated = await this.ratingTypesRepository.create({ name: ratingType });
    //             await this.ratingTypesRepository.save(ratingTypeToBeCreated);
    //         }
    //     });
    // }

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

    async updateReview(review: CreateReviewDTO, reviewId: string, user: any): Promise<ShowReviewDTO> {
        const reviewToBeUpdated = await this.reviewsRepository.findOne({ id: reviewId, isDeleted: false });
        if (!reviewToBeUpdated) {
            return undefined;
        }
        reviewToBeUpdated.comment = review.comment;
        reviewToBeUpdated.ratingType = review.ratingType;
        const updatedReview = await this.reviewsRepository.save(reviewToBeUpdated);
        return this.createReviewDTO(updatedReview);
    }

    async deleteReview(reviewId: string, user: any): Promise<ShowReviewDTO> {
        const reviewToBeDeleted = await this.reviewsRepository.findOne({ id: reviewId, isDeleted: false });
        if (!reviewToBeDeleted) {
            return undefined;
        }
        reviewToBeDeleted.isDeleted = true;
        const deletedReview = await this.reviewsRepository.save(reviewToBeDeleted);
        return this.createReviewDTO(deletedReview);
    }

    async showReview(reviewId: string): Promise<ShowReviewDTO | undefined> {
        const review = await this.reviewsRepository.findOne({ id: reviewId, isDeleted: false });
        if (!!review) {
            return this.createReviewDTO(review);
        } else {
            return undefined;
        }
    }

    async userAlreadyReviewedThisBook(bookId: string, autor: any): Promise<string> | undefined {
        const reviewFromThisUserForThatBook: Review = await this.reviewsRepository.findOne({ where:
            { book: bookId, user: autor, isDeleted: 0 }
        });
        if (!!reviewFromThisUserForThatBook) {
            return 'reviewFromThisUserForThatBookAlreadyExist';
        }
    }

    // userHasReturnedThisBook
    async userHasReturnedThisBook(bookId: string, author: any): Promise<string> | undefined {
        const returnEventFromThisUserForThisBook: LibraryEvent = await this.libraryEventRepository.findOne({ where:
            { book: bookId, user: author, borrowType: 'Returned' }
        });
        if (!!returnEventFromThisUserForThisBook) {
            return 'User must take and return this book before reviewing it!';
        }
    }

    // validaion of enum because of a enum input bug!
    async validateRatingEnum(ratingInput: any): Promise<string> | undefined {
        const wrongInput = 'Wrong Input!';
        switch (ratingInput) {
            case 'Awful':
                return wrongInput;
            case 'Bad':
                return wrongInput;
            case 'Average':
                return wrongInput;
            case 'Good':
                return wrongInput;
            case 'Excellent':
                return wrongInput;
            default:
                break;
        }
    }



    // -----------------------
    async updateReviewPermission(bookId: string, user: UserShowDTO): Promise<string> | undefined {
        const reviewPermissionToBeUpdated = await this.reviewPermissionRepository.findOne({
            where: {book: bookId, user: user}
        });
        if (!!reviewPermissionToBeUpdated) {
            if (reviewPermissionToBeUpdated.isAllowedToReview === false) {
                reviewPermissionToBeUpdated.isAllowedToReview = true;
            } else if (reviewPermissionToBeUpdated.isAllowedToReview === true) {
                reviewPermissionToBeUpdated.isAllowedToReview = false;
            }
            const updatedReviewPermission = await this.reviewPermissionRepository.save(reviewPermissionToBeUpdated);
            if (!!updatedReviewPermission) {
                return 'Review Permission successfully updated!';
            }
        }
    }
    // ----------------------



}
