import { Injectable } from '@nestjs/common';
import { LibraryEvent } from 'src/data/entities/library-event.entity';
import { ShowLibraryEventDTO } from 'src/models/library-events/show-library-event.dto';
import { plainToClass } from 'class-transformer';
import { BorrowTypeEnum } from 'src/common/enums/borrow-type.enum';
import { async } from 'rxjs/internal/scheduler/async';
import { BorrowType } from 'src/data/entities/borrow-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LibraryEventsService {

    constructor(
        // @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        // @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
        // @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(BorrowType) private readonly borrowTypesRepository: Repository<BorrowType>,
    ) { }


    async createLibraryEventDTO(libraryEvent: LibraryEvent): Promise<ShowLibraryEventDTO> {
        const libraryEventDTO = {
            id: libraryEvent.id,
            user: await libraryEvent.user,
            book: await libraryEvent.book,
            borrow: libraryEvent.borrow,
            timestamp: libraryEvent.timestamp,
        };
        return await plainToClass(ShowLibraryEventDTO, libraryEventDTO);
    }


    async checkForBorrowTypesAndCreateThem(): Promise<void> {
        const borrowTypes = [ BorrowTypeEnum.Taken, BorrowTypeEnum.Taken ];
        await borrowTypes.forEach(async (borrowType) => {
            if (!(await this.borrowTypesRepository.findOne({ name: borrowType }))) {
                const borrowTypeToBeCreated = await this.borrowTypesRepository.create({ name: borrowType });
                await this.borrowTypesRepository.save(borrowTypeToBeCreated);
            }
        });
    }


    async takeBook() {

    }


    async returnBook() {

    }
    

    async checkIfBookIsTaken() {

    }


    async checkIfBookIsTakenByTheUser() {

    }



    // async createNewReview(createReview: CreateReviewDTO, bookId: string, user: UserShowDTO): Promise<ShowReviewDTO> {
    //     const reviewToBeCreated = await this.reviewsRepository.create(createReview);
    //     const bookOfTheReview = await this.booksRepository.findOne({ id: bookId, isDeleted: false });
    //     if (!bookOfTheReview) {
    //         return undefined;
    //     }
    //     const author = await this.usersRepository.findOne({ username: user.username });
    //     reviewToBeCreated.book = Promise.resolve(bookOfTheReview);
    //     reviewToBeCreated.user = Promise.resolve(author);
    //     const createdReview = await this.reviewsRepository.save(reviewToBeCreated);
    //     return this.createReviewDTO(createdReview);
    // }







}
