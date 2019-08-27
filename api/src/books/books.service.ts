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


@Injectable()
export class BooksService {

    public constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly reviewsService: ReviewsService,
    ) { }

    

    async createShowBookDTO(book: Book): Promise<ShowBookWithReviewsDTO> {
        const reviews = await book.review;
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
    // review: ShowReviewDTO[];







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
