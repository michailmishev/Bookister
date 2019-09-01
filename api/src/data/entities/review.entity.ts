import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Entity, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';
import { RatingType } from './rating-type.entity';

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
    @ManyToOne(type => RatingType, ratingType => ratingType.name)
    rating: RatingType;
    //
    // @ManyToOne(type => RatingType, ratingType => ratingType.name, { eager: true })
    // rating: RatingType[];
    // --------------
    // @JoinColumn()
    // @ManyToOne(type => RatingType, ratingType => ratingType.name)
    // rating: Promise<RatingType>;
    //
//     { eager : true })
// post: Post[ ];   
    //


    @Column('nvarchar', {length: 2000})
    comment: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column('boolean', {default: false})
    isDeleted: boolean;

}
