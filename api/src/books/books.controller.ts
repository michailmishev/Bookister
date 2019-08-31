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
    Param,
    NotFoundException,
    UnauthorizedException,
    BadRequestException,
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
import { IsAdmin } from 'src/common/decorators/is-admin.decorator';
import { UpdateBookDTO } from 'src/models/books/update-book.dto';
import { async } from 'rxjs/internal/scheduler/async';
// import { Query } from 'typeorm/driver/Query';

@Controller('books')
export class BooksController {

    constructor(
        private bookService: BooksService,
        private usersService: UsersService,
    ) { }

    // GET ALL BOOKS
    @Get()
    // @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getBooks(
        @Query() query: any,
    ) {
        return this.bookService.getAllBooks(query);
    }

    // GET A SPECIFIC BOOK WITH ITS REVIEWS
    @Get('/:bookId')
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getBookWithDetails(
        @Param('bookId') bookId: string,
    ) {
        const book = await this.bookService.getBookById(bookId);
        if (!book) {
            throw new NotFoundException(`Book does not exist or it has been deleted`);
        }
        return book;
    }

    // CREATE BOOK
    @Post()
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    async create(
        @IsAdmin() isAdmin: boolean,
        @Body() book1: CreateBookDTO,
    ): Promise<any> {
        if (!isAdmin) {
            throw new UnauthorizedException('Books can be added only by the admin!');
        }

        const bookExistsInTheDatabase = await this.bookService.findBookTitleInTheDatabase(book1.title);
        if (bookExistsInTheDatabase) {
            throw new BadRequestException('This book already exists!');
        }

        const createdBook: ShowBookWithoutReviewsDTO =  await this.bookService.createNewBook(book1);
        return {
            message: 'Book has been submitted successfully!',
            data: createdBook,
            };

    }

    // DELETE BOOK
    @Delete('/:bookId')
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteBook(
        @Param('bookId') bookId: string,
        @IsAdmin() isAdmin: boolean,
    ) {
        if (!isAdmin) {
            throw new UnauthorizedException('Books can be deleted only by the admin!');
        }
        const bookToDel = await this.bookService.deleteBook(bookId);
        if (!bookToDel) {
            throw new NotFoundException('Book does not exist!');
        }
        return {
                message: 'Book has been deleted successfully!',
                data: bookToDel,
        };
    }

    // EDIT BOOK
    @Put('/:bookId')
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    async updateBook(
        @Param('bookId') bookId: string,
        @Body() updatedBook: UpdateBookDTO,
        @IsAdmin() isAdmin: boolean,
    ) {
        if (!isAdmin) {
            throw new UnauthorizedException('Books can be updated only by the admin!');
        }
        const updateBook = await this.bookService.updateBook(bookId, updatedBook);
        if (!updateBook) {
            throw new NotFoundException(`Book does not exist.`);
        }
        return {
            message: 'Book has been updated successfully!',
            data: updateBook,
        };
    }

}
