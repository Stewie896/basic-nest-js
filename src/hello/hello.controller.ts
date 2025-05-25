/* eslint-disable prettier/prettier */
import {  Get, Param} from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
    constructor(private readonly yalo:HelloService) {}
    @Get('get')
     sayHello():any{
 return this.yalo.voidd();
     }

     @Get("time/:nawa")
        dynamicName(@Param('nawa') n: string):string{
             return this.yalo.dynamicValue(n)
        }

        // getArrofthns():object[]{
        //     return[
        //         {
        //             name: "abhiral",
        //             age:18,
        //             hobby: "NVM"
        //         },
        //         {
        //             name: "Jenkins",
        //             age: 21,
        //             hobby: "PipeLining"
        //         },
        //     {
        //         name: "Docker | Kubernetes",
        //         age: 29,
        //         hobby: "Containerization"
        //     }
        //     ]
        // }
}
