/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { Post } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Entityy } from './../databse/entities';
/* eslint-disable prettier/prettier */
// import { New_Updated } from './post.service';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Posts } from './interface/interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vali_dator } from './dto/create.post.dto';

export interface New_Updated extends Posts {
  id: number;
  jkl?: string;
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Entityy)
    private readonly instance_repo: Repository<Entityy>,
  ) {}
  // private post: New_Updated[] = [
  //   {
  //     id: 1,
  //     title: 'Metamorphis',
  //     date: new Date(),
  //     created_at: new Date(),
  //     description: 'Whir-Wind in the chaos of life',
  //     publisher: 'Kafka',
  //     estimated_Target: 800,
  //     updated_at: new Date(),
  //   },
  // ];

  async find_all_Post(): Promise<Entityy[]> {
    return await this.instance_repo.find();
  }

  async create_single_post(
    newlyCreated_data: Omit<Vali_dator, 'id'>,
  ): Promise<any> {
    const data = this.instance_repo.create({
      description: newlyCreated_data.description,
      estimated_Target: newlyCreated_data.estimated_Target,
      publisher: newlyCreated_data.publisher,
      title: newlyCreated_data.title,
      updated_at: new Date(),
    });

    return await this.instance_repo.save(data); // ✅ Saves data to DB
  }

  // private helper_id() {
  //   return this.post.length > 0
  //     ? Math.max(...this.post.map((e) => e.id)) + 1
  //     : 1;

  async delet_post(id: number) {
    const hello = await this.instance_repo.delete(id);
    if (!hello) {
      console.log(`This ${id} is not present !`);
    }
    return `Deleted ${hello.affected}`;
  }

  async update_post(id: number, updated_Val: Partial<Omit<New_Updated, 'id'>>) {
    const hello = await this.instance_repo.update(id, updated_Val);
    if (!hello.affected) {
      return `The id ${id} not found`;
    }

    return `${id} updated succesfully !`;
  }
}

//   delet_Post(post_id: number) {
//     const mapped_post = this.post.findIndex((e) => e.id === post_id);
//     if (mapped_post === -1) {
//       throw new ForbiddenException(`This id ${post_id} does not exist`);
//     }

//     const splicedDate = this.post.splice(mapped_post);
//     return splicedDate;
//   }
// }
//  delet_Post(post_id: number) {
//     const mapped_post = this.post.findIndex((e) => e.id === post_id);
//     if (mapped_post === -1) {
//       throw new ForbiddenException(`This id ${post_id} does not exist`);
//     }

//     const splicedDate = this.post.splice(mapped_post);
//     return splicedDate;
//   }
// }
