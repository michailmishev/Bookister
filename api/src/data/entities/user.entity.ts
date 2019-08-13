import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Banstatus } from './banstatus.entity';
import { Role } from './role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({unique: true})
    username: string;
    @Column('nvarchar')
    password: string;
    @Column({unique: true})
    email: string;
    @JoinTable()
    @ManyToMany(type => Role, { eager: true })
    roles: Role[];
    @Column('boolean', {default: false})
    isDeleted: boolean;
    @JoinColumn()
    @OneToOne(type => Banstatus, {eager: true})
    banstatus: Banstatus;
}
