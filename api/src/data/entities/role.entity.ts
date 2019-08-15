import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('nvarchar')
    name: string;

}
