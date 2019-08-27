import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from 'src/data/entities/book.entity';
import { User } from 'src/data/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from 'src/core/core.module';
import { AuthModule } from 'src/auth/auth.module';
import { ReviewsModule } from '../reviews/reviews.module';

@Module({
  imports: [
    CoreModule, AuthModule, ReviewsModule, TypeOrmModule.forFeature([Book, User]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
