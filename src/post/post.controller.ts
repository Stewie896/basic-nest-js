/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { New_Updated, PostService } from './post.service';
// import { Posts } from './interface/interface';
import { Vali_dator } from './dto/create.post.dto';

@Controller('')
export class PostController {
  constructor(private borrwoed_power: PostService) {}

  @Get('/getall')
  async get_all(): Promise<Vali_dator[]> {
    return await this.borrwoed_power.find_all_Post();
  }

  @Post('/post')
  @HttpCode(HttpStatus.CREATED)
  create_post(@Body() createPost: Vali_dator) {
    //  console.log(createPost , "THE FIRST DA%A")
    return this.borrwoed_power.create_single_post(createPost);
  }

  // @Post('/p')
  // get_raw_body(@Body() data: any){
  //   console.log(data)
  // }

  @Put('/post/:update')
  @HttpCode(HttpStatus.ACCEPTED)
  update_method(
    @Param('update', ParseIntPipe) id: number,
    @Body() updated_Val: Partial<Omit<New_Updated, 'id'>>,
  ) {
    return  this.borrwoed_power.update_post(id, updated_Val);
  }

  @Delete('/delet/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  delet_function(@Param('id', ParseIntPipe) delet_id: number) {
    return this.borrwoed_power.delet_post(delet_id);
  }
}
