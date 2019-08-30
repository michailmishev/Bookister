import { Module } from '@nestjs/common';
import { LibraryEventsService } from './library-events.service';
import { LibraryEventsController } from './library-events.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowType } from 'src/data/entities/borrow-type.entity';
import { User } from 'src/data/entities/user.entity';
import { Book } from 'src/data/entities/book.entity';
import { LibraryEvent } from 'src/data/entities/library-event.entity';

@Module({

    imports: [AuthModule, TypeOrmModule.forFeature([Book, User, BorrowType, LibraryEvent])],
    controllers: [LibraryEventsController],
    providers: [LibraryEventsService],
    exports: [LibraryEventsService],

})
export class LibraryEventsModule {}
