import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Entity } from 'typeorm';
import { LibraryEvent } from './library-event.entity';
import { BorrowTypeEnum } from '../../common/enums/borrow-type.enum';
@Entity('borrow_type')
export class BorrowType {

    @PrimaryGeneratedColumn()
    id: string;

    // @Column({
    //     type: 'enum',
    //     enum: BorrowTypeEnum,         // Taken / Returned
    // })
    // name: BorrowTypeEnum;            // Taken / Returned
    @Column('nvarchar')
    name: string;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - -

    // @OneToMany(type => LibraryEvent, libraryEvent => libraryEvent.name)
    // libraryEvents: LibraryEvent[];

}
