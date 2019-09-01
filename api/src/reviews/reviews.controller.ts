import { Controller,
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
    Delete } from '@nestjs/common';
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

@Controller('books')
export class ReviewsController {

    constructor(
        private readonly reviewsService: ReviewsService,
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
        await this.reviewsService.checkForRatingTypesAndCreateThem();
        const createdReview = await this.reviewsService.createNewReview(review1, bookId, user);
        if (!createdReview) {
            throw new NotFoundException('This book was not found.');
        }
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
        const createdReview = await this.reviewsService.updateReview(review1, reviewId, user);
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
        return await review;
    }

}