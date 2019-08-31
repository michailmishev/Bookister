import { Injectable } from '@nestjs/common';

import { ShowBookWithoutReviewsDTO } from '../models/books/show-book-without-reviews.dto';
import { ShowBookWithReviewsDTO } from '../models/books/show-book-with-reviews.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../data/entities/book.entity';
import { plainToClass } from 'class-transformer';
import { Review } from 'src/data/entities/review.entity';
import { CreateBookDTO } from 'src/models/books/create-book.dto';
import { User } from '../data/entities/user.entity';
import { UserShowDTO } from '../models/user';
import { ReviewsService } from 'src/reviews/reviews.service';
import { UpdateBookDTO } from 'src/models/books/update-book.dto';

@Injectable()
export class BooksService {

    public constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly reviewsService: ReviewsService,
    ) { }

    async createShowBookDTO(book: Book): Promise<ShowBookWithReviewsDTO> {
        const reviews = await book.review;          // !
        const bookDTO = await {
            id: book.id,
            title: book.title,
            author: book.author,
            topic: book.topic,
            language: book.language,
            timestamp: book.timestamp,
            averageRating: book.averageRating,
            isTaken: book.isTaken,
            reviews: await Promise.all((reviews.filter((review: Review) => review.isDeleted === false))
                .map(async (x: Review) => await this.reviewsService.createReviewDTO(x))),
        };
        return await plainToClass(ShowBookWithReviewsDTO, bookDTO);
    }

    async createNewBook(createBook: CreateBookDTO): Promise<ShowBookWithoutReviewsDTO> {
        const newBook = await this.bookRepository.create(createBook);
        const createdBook = await this.bookRepository.save(newBook);
        const bookDTO = await this.createShowBookDTO(createdBook);
        return plainToClass(ShowBookWithoutReviewsDTO, bookDTO);
    }

    async getAllBooks(Query?): Promise<ShowBookWithoutReviewsDTO[]> {
        const allBooks = await this.bookRepository.find({ isDeleted: false });
        const bookDTO = Promise.all(allBooks.map(async (x: Book) => await this.createShowBookDTO(x)));
        const newkey = Object.keys(Query).toString();
        if (!!newkey) {
            return await plainToClass(ShowBookWithReviewsDTO, (await bookDTO).slice(0, +newkey));
        }
        return await plainToClass(ShowBookWithReviewsDTO, await bookDTO);
    }

    // show book with ist reviews:
    async getBookById(id: string): Promise<ShowBookWithReviewsDTO> | undefined {
        const book = await this.bookRepository.findOne({ id, isDeleted: false });
        if (!book) {
            return undefined;
        }
        const bookDTO = await this.createShowBookDTO(book);
        return plainToClass(ShowBookWithReviewsDTO, bookDTO);
    }

    async updateBook(id: string, updateBook: UpdateBookDTO): Promise<ShowBookWithoutReviewsDTO> {
        const bookToBeUpdated: Book = await this.bookRepository.findOne({ id, isDeleted: false });
        if (!bookToBeUpdated) {
            return undefined;
        }
        const updatedBook: Book = bookToBeUpdated;
        updatedBook.title = updateBook.title;
        updatedBook.author = updateBook.author;
        updatedBook.topic = updateBook.topic;
        updatedBook.language = updateBook.language;
        //
        updatedBook.averageRating  = updateBook.averageRating;      // delete later
        //
        const savedBook = await this.bookRepository.save(updatedBook);
        const bookDTO = await this.createShowBookDTO(savedBook);
        return plainToClass(ShowBookWithoutReviewsDTO, bookDTO);
    }

    async deleteBook(id: string): Promise<ShowBookWithoutReviewsDTO> {
        const bookToBeDeleted: Book = await this.bookRepository.findOne({ id, isDeleted: false });
        if (!bookToBeDeleted)  {
            return undefined;
        }
        bookToBeDeleted.isDeleted = true;
        const deletedBook = await this.bookRepository.save(bookToBeDeleted);
        const bookDTO = await this.createNewBook(deletedBook);
        return plainToClass(ShowBookWithoutReviewsDTO, bookDTO);
    }

    // findBookTitleInTheDatabase - needed by creating a book for checking if the book already exists
    async findBookTitleInTheDatabase(title: string): Promise<string> | undefined {
        const bookWithSuchTitle: Book = await this.bookRepository.findOne({ title });
        if (!!bookWithSuchTitle) {
            return bookWithSuchTitle.title;
        }
    }

    // filterBySort     // name / date / rating

    // filterByAvailability

    // filterByAuthor

    // filterByTopic

    // filterByLanguage

}
