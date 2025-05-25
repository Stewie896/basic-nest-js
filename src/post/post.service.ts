/* eslint-disable prettier/prettier */
// import { New_Updated } from './post.service';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Posts } from './interface/interface';

export interface New_Updated extends Posts {
  id: number;
  jkl?: string;
}

@Injectable()
export class PostService {
  private post: New_Updated[] = [
    {
      id: 1,
      title: 'Metamorphis',
      date: new Date(),
      created_at: new Date(),
      description: 'Whir-Wind in the chaos of life',
      publisher: 'Kafka',
      estimated_Target: 800,
      updated_at: new Date(),
    },
  ];

  find_all_Post(): Posts[] {
    return this.post;
  }

  create_single_post(newlyCreated_data: Omit<New_Updated, 'id'>) {
    // console.log(newlyCreated_data, "THe all data")
    const newPost: New_Updated = {
      id: this.helper_id(),
      ...newlyCreated_data,
      jkl: 'VOID sayHello',
    };
    this.post.push(newPost);

    return 'DOne';
  }

  private helper_id() {
    return this.post.length > 0
      ? Math.max(...this.post.map((e) => e.id)) + 1
      : 1;
  }

  update_post(
    id: number,
    updatedValue: Partial<Omit<New_Updated, 'id'>>,
  ): Partial<New_Updated> {
    const index_val = this.post.findIndex((val) => val.id === id);
    if (index_val === -1) {
      throw new ForbiddenException(`The id ${id} not found!!`);
    }

    this.post[index_val] = {
      ...this.post[index_val],
      ...updatedValue,
    };

    return this.post[index_val];
  }

  delet_Post(post_id: number) {
    const mapped_post = this.post.findIndex((e) => e.id === post_id);
    if (mapped_post === -1) {
      throw new ForbiddenException(`This id ${post_id} does not exist`);
    }

    const splicedDate = this.post.splice(mapped_post);
    return splicedDate;
  }
}
