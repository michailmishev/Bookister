import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Entity, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';
import { RatingTypeEnum } from 'src/common/enums/rating-type.enum';

@Entity('review')
export class Review {

    // @PrimaryGeneratedColumn('uuid')
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => User, user => user.review)
    user: Promise<User>;

    @ManyToOne(type => Book, book => book.review)
    book: Promise<Book>;

    //
    // @Column({
    //     type: 'enum',
    //     enum: RatingTypeEnum,        // Awful / Bad / Average / Good / Excellent
    // })
    // ratingType: RatingTypeEnum;
    //
    @Column('nvarchar')
    ratingType: string;
    //

    @Column('nvarchar', {length: 2000})
    comment: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column('boolean', {default: false})
    isDeleted: boolean;

}
