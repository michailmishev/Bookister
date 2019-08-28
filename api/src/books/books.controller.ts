import {
    Controller,
    HttpStatus,
    HttpCode,
    UsePipes,
    ValidationPipe,
    Post,
    Get,
    Put,
    Delete,
    Body,
    UseGuards,
    Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from 'src/data/entities/book.entity';
import { CreateBookDTO } from '../models/books/create-book.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ShowBookWithoutReviewsDTO } from 'src/models/books/show-book-without-reviews.dto';
import { User } from 'src/data/entities/user.entity';
import { UserShowDTO } from 'src/models/user';
import { UsersService } from 'src/core/services/users.service';
// import { Query } from 'typeorm/driver/Query';

@Controller('books')
export class BooksController {

    constructor(
        private bookService: BooksService,
        private usersService: UsersService,
    ) { }



    @Post('books')
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    async create(
        @Body() book1: CreateBookDTO,
    ): Promise<any> {
        const createdBook: ShowBookWithoutReviewsDTO =  await this.bookService.createNewBook(book1);
        return {
            message: 'Book has been submitted successfully!',
            data: createdBook,
            };

    }




    @Get('books')
    // @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getBooks(
        @Query() query: any,
    ) {
        return this.bookService.getAllBooks(query);
    }






}
