import { Module } from '@nestjs/common';
import { Review } from 'src/data/entities/review.entity';
import { Book } from 'src/data/entities/book.entity';
import { User } from 'src/data/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({

  imports: [AuthModule, TypeOrmModule.forFeature([Review, Book, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],

})
export class ReviewsModule {}
