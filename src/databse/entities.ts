/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn} from 'typeorm';

@Entity()
export class Entityy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  publisher: string;

  @Column()
  estimated_Target: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

//title: string ;
// date?: Date;
// description: string | number;
// publisher: string
// estimated_Target: number
// created_at?: Date;
// updated_at?:Date
