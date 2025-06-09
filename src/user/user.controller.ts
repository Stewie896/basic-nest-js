/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Controller , Get, Param, ParseIntPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelloService } from 'src/hello/hello.service';
// import * as env from  'dotenv';
//env.config();

@Controller('user')
export class UserController {
    constructor(private readonly inheritedValue:HelloService , private env_Value:ConfigService ){}
    @Get('/arr')
    emitedValue(){
        return this.inheritedValue.getArrofthns();
    }

    @Get('/arr/:id')
    nawa(@Param('id' , ParseIntPipe) id: number){
        return this.inheritedValue.find_the_user(id)
    }

    @Get('/env')
     fnc(){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const val = this.env_Value.get<any>("NAME");
        console.log(process.env.NAME)
        console.log(process.env.CLASS)

       return `This value is ${val}`
       
     }

    

}
