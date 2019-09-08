import { Module, forwardRef } from '@nestjs/common';
import { Review } from 'src/data/entities/review.entity';
import { Book } from 'src/data/entities/book.entity';
import { User } from 'src/data/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { LibraryEvent } from 'src/data/entities/library-event.entity';
import { BooksModule } from 'src/books/books.module';
import { BooksService } from 'src/books/books.service';
// import { RatingType } from 'src/data/entities/rating-type.entity';

@Module({

  imports: [AuthModule, TypeOrmModule.forFeature([Review, Book, User, LibraryEvent /* , RatingType */ ]), forwardRef(() => BooksModule)],
  controllers: [ReviewsController],
  providers: [ReviewsService, BooksService],
  exports: [ReviewsService, BooksService] ,

})
export class ReviewsModule {}
