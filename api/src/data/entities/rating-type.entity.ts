import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';
import { RatingTypeEnum } from '../../common/enums/rating-type.enum';

@Entity('rating_type')
export class RatingType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: RatingTypeEnum,        // Awful / Bad / Average / Good / Excellent
    })
    name: RatingTypeEnum;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - -

    // @OneToMany(type => Review, review => review.rating)
    // review: Review[];

}
