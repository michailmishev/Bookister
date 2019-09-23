import {
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards, UsePipes,
    ValidationPipe,
    Param,
    Body,
    NotFoundException,
    Put,
    UnauthorizedException,
    Get,
    Delete,
    BadRequestException} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { async } from 'rxjs/internal/scheduler/async';
import { User } from '../common/decorators/user.decorator';
import { UserShowDTO } from 'src/models/user';
import { CreateReviewDTO } from 'src/models/reviews/create-review.dto';
import { IsAdmin } from 'src/common/decorators/is-admin.decorator';
import { UpdateReviewDTO } from 'src/models/reviews/update-review.dto';
import { ShowReviewDTO } from 'src/models/reviews/show-review.dto';
import { BooksService } from 'src/books/books.service';

@Controller('books')
export class ReviewsController {
    libraryEventService: any;

    constructor(
        private readonly reviewsService: ReviewsService,
        private readonly bookService: BooksService,
    ) { }

    @Post('/:bookId/reviews')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    async createNewReview(
        @User() user: UserShowDTO,
        @Param('bookId') bookId: string,
        @Body() review1: CreateReviewDTO,
    ): Promise<any> {
        // await this.reviewsService.checkForRatingTypesAndCreateThem();

        // for some reason the enum is not working properly!
        const validationOfRatingEnum = await this.reviewsService.validateRatingEnum(review1.ratingType);
        if (validationOfRatingEnum) {
            throw new BadRequestException('Wrong rating input! Rating must be a valid RatingTypeEnum!');
        }

        const returnEventForThisBookFromThatUser = await this.reviewsService.userHasReturnedThisBook(bookId, user);
        if (!returnEventForThisBookFromThatUser) {
            throw new BadRequestException('In order to leave a review you must read the book first!');
        }

        // doesn't check the deleted reviews:
        const reviewFromThisUserForThatBook = await this.reviewsService.userAlreadyReviewedThisBook(bookId, user);
        if (reviewFromThisUserForThatBook) {
            throw new BadRequestException('You have already left review for this book!');
        }

        const createdReview = await this.reviewsService.createNewReview(review1, bookId, user);
        if (!createdReview) {
            throw new NotFoundException('This book was not found.');
        }

        //
        const updateBookAveragaRating = await this.bookService.updateBookAveragaRating(bookId);
        if (!updateBookAveragaRating) {
            throw new BadRequestException('There was a problem with updating the average rating of the book!');
        }
        //

        return {
            message: 'Review has been submitted successfully!',
            data: createdReview,
        };
    }

    @Put('/:bookId/reviews/:reviewId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    async updateReview(
        @User() user: UserShowDTO,
        @Param('bookId') bookId: string,
        @Param('reviewId') reviewId: string,
        @Body() review1: UpdateReviewDTO,
        @IsAdmin() isAdmin: boolean,
    ): Promise<any> {
        const reviewToBeUpdated = this.showReview(reviewId);
        if (!reviewToBeUpdated) {
            throw new NotFoundException('Review not found!');
        } else if (((await reviewToBeUpdated).user.username !== user.username) && !isAdmin) {
            throw new UnauthorizedException('Unauthorized operation!');
        }

        const validationOfRatingEnum = await this.reviewsService.validateRatingEnum(review1.ratingType);
        if (validationOfRatingEnum) {
            throw new BadRequestException('Wrong rating input! Rating must be a valid RatingTypeEnum!');
        }

        const createdReview = await this.reviewsService.updateReview(review1, reviewId, user);

        //
        const updateBookAveragaRating = await this.bookService.updateBookAveragaRating(bookId);
        if (!updateBookAveragaRating) {
            throw new BadRequestException('There was a problem with updating the average rating of the book!');
        }
        //

        return {
            message: 'Review has been updated successfully!',
            data: createdReview,
        };
    }

    @Delete('/:bookId/reviews/:reviewId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    async deleteComment(
        @User() user: UserShowDTO,
        @Param('bookId') bookId: string,
        @Param('reviewId') reviewId: string,
        @IsAdmin() isAdmin: boolean,
    ): Promise<any> {
        const reviewToBeDeleted = this.showReview(reviewId);
        if (!reviewToBeDeleted) {
            throw new NotFoundException('Review not found!');
        } else if (((await reviewToBeDeleted).user.username !== user.username) && !isAdmin) {
            throw new UnauthorizedException('Unauthorized operation!');
        }

        const createdReview = await this.reviewsService.deleteReview(reviewId, user);

        // --------------------------- Can't update book's average rating after deleting a review ! ! ! --------------------------
        // const updateBookAveragaRating = await this.bookService.updateBookAveragaRating(bookId);
        // if (!updateBookAveragaRating) {
        //     throw new BadRequestException('There was a problem with updating the average rating of the book!');
        // }

        return {
            message: 'Review has been deleted successfully!',
            data: createdReview,
        };
    }

    @Get('/:bookId/reviews/:reviewId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    async showReview(
        @Param('reviewId') reviewId: string,
    ): Promise<ShowReviewDTO> {
        const review = await this.reviewsService.showReview(reviewId);
        if (!review) {
            throw new NotFoundException('Review not found!');
        }

        // const updateBookAveragaRating = await this.bookService.updateBookAveragaRating(bookId);
        // if (!updateBookAveragaRating) {
        //     throw new BadRequestException('There was a problem with updating the average rating of the book!');
        // }

        return await review;
    }

}
