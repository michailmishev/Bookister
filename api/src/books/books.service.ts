import { Injectable } from '@nestjs/common';

import { ShowBookWithoutReviewsDTO } from '../models/books/show-book-without-reviews.dto';
import { ShowBookWithReviewsDTO } from '../models/books/show-book-with-reviews.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../data/entities/book.entity';
import { plainToClass } from 'class-transformer';
import { BookReview } from 'src/data/entities/book-review.entity';
import { CreateBookDTO } from 'src/models/books/create-book.dto';
import { User } from '../data/entities/user.entity';
import { UserShowDTO } from '../models/user';


@Injectable()
export class BooksService {

    public constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        // private readonly bookReviewService: BookReviewService,
    ) { }

    

    async createShowBookDTO(book: Book): Promise<ShowBookWithReviewsDTO> {
        const reviews = await book.bookReview;
        const bookDTO = await {
            id: book.id,
            title: book.title,
            author: book.author,
            topic: book.topic,
            language: book.language,
            timestamp: book.timestamp,
            averageRating: book.averageRating,
            isTaken: book.isTaken,
            
            // bookReviews: await Promise.all((bookReviews.filter((bookReview: BookReview) => bookReview.isDeleted === false))
            //     .map(async (x: BookReviews) => await this.bookReviewService.createBookReviewDTO(x))),
            
        };
        return await plainToClass(ShowBookWithReviewsDTO, bookDTO);
    }







    async createNewBook(createBook: CreateBookDTO): Promise<ShowBookWithoutReviewsDTO> {
        const newBook = await this.bookRepository.create(createBook);
        // const author = await this.userRepository.findOne({ username: user.username });
        // newBook.author = Promise.resolve(author);
        const createdBook = await this.bookRepository.save(newBook);
        const bookDTO = await this.createShowBookDTO(createdBook);
        return plainToClass(ShowBookWithoutReviewsDTO, bookDTO);
    }




    // id: string;
    // title: string;
    // author: string;
    // topic: string;
    // laguage: string;
    // timestamp: Date;
    // averageRating: string;
    // isTaken: boolean;
    // bookReview: ShowBookReviewDTO[];







    // getAllBooks

    // getBookById

    // createBook

    // updateBook

    // deleteBook

    // filterBySort     // name / date / rating

    // filterByAvailability

    // filterByAuthor

    // filterByTopic

    // filterByLanguage

}
