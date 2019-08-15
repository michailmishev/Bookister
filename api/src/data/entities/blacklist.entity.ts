import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from 'typeorm';

@Entity('blacklist')
export class Blacklist {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    token: string;

    @CreateDateColumn()
    date: Date;

}
