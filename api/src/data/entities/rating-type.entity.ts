import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookReview } from './book-review.entity';

@Entity('rating_type')
export class RatingType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('nvarchar', {length: 9})
    name: string;       // awful / bad / average / good / excellent

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - -

    // @OneToMany(type => BookReview, bookReview => bookReview.rating)
    // bookReview: BookReview[];

}
