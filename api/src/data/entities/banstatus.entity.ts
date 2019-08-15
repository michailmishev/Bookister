import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('banstatus')
export class Banstatus {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('boolean', {default: false})
    isBanned: boolean;

    @Column('nvarchar', {default: 'This user is not banned!'})
    description: string;

}
