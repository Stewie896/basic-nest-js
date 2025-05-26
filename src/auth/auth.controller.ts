/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { Login_Dto } from './db/login_dto';
import { User_Login_dto } from './db/auth_dot';
import { Login_Dto } from './db/login_dto';

@Controller('auth')
export class AuthController {

    constructor( private readonly working_tree: AuthService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    sgn_up(@Body() body: User_Login_dto){
      return this.working_tree.signup(body)
    }

    @Post('/login')
    @HttpCode(HttpStatus.CREATED)

    log_in(@Body() data: Login_Dto){
return this.working_tree.login(data)
    } 

}
