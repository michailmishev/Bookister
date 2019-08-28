import { Controller, Post, HttpCode, HttpStatus, UseGuards, UsePipes, ValidationPipe, Param, Body, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { async } from 'rxjs/internal/scheduler/async';
import { User } from '../common/decorators/user.decorator';
import { UserShowDTO } from 'src/models/user';
import { CreateReviewDTO } from 'src/models/reviews/create-review.dto';

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



}
