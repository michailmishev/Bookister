import { Module } from '@nestjs/common';
import { LibraryEventsService } from './library-events.service';
import { LibraryEventsController } from './library-events.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BorrowType } from 'src/data/entities/borrow-type.entity';
import { User } from 'src/data/entities/user.entity';
import { Book } from 'src/data/entities/book.entity';
import { LibraryEvent } from 'src/data/entities/library-event.entity';
import { BooksService } from 'src/books/books.service';
import { BooksModule } from 'src/books/books.module';

@Module({

    imports: [AuthModule, TypeOrmModule.forFeature([Book, User, /* BorrowType, */ LibraryEvent]) , BooksModule],
    controllers: [LibraryEventsController],
    providers: [LibraryEventsService, BooksService],
    exports: [LibraryEventsService, BooksService],

})
export class LibraryEventsModule {}
