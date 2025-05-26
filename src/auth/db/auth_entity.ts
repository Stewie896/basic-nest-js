/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
/* eslint-disable prettier/prettier */
import { MinLength } from "class-validator";
import { Role } from './enum';
import { Entityy } from './../../databse/entities';


@Entity()
export class User_Entity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({unique: true})
  email: string

  @Column()
  password: any

  @Column({default: Role.normal_user})
  role: Role.normal_user

}