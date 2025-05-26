/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entityy } from 'src/databse/entities';
   
@Module({
  imports: [TypeOrmModule.forFeature([Entityy])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
