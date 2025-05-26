/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm';
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Entity } from './db/auth_entity';
import * as bcrypt from 'bcrypt';
import { User_Login_dto } from './db/auth_dot';
import { Login_Dto } from './db/login_dto';
// import { ExceptionHandler } from 'winston';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User_Entity)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private superr: Repository<User_Entity>,
  ) {}

  async signup_helper(val: string): Promise<string> {
    const gen_salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(val, gen_salt);
    return hashed_pass;
  }

  async signup(value: User_Login_dto): Promise<string> {
    const num_val = await this.superr.find({
      where: { email: value.email },
    });
    if (!num_val) {
      throw new NotFoundException();
    }

    const hashed_pass = await this.signup_helper(value.password);
    const created_val = this.superr.create({
      username: value.username,
      email: value.email,
      password: hashed_pass,
      // role: value.role
    });

    const saved_data = await this.superr.save(created_val);

    return `User ${saved_data.email} sign up succesfull`;
  }


  async generateToken(tokena_va: string, token_id: number): Promise<string> {
    const jwt_secret = 'jwt-secret';
    const genreated_token = await jwt.sign(
      { username: tokena_va, id: token_id },
      jwt_secret,
      {
        expiresIn: '15 min',
      },
    );
    return genreated_token;
  }

  async login(reveived_val: Login_Dto): Promise<{}> {
    const { username, password } = await reveived_val;
    const db_operation = await this.superr.find({
      where: { username: username },
    });

    if (db_operation.length === 0) {
      throw new UnauthorizedException(
        'This username does not exist please retry again!',
      );
    }

    const decrypted_password = await bcrypt.compare(
      password,
      db_operation[0].password,
    );
    if (!decrypted_password) {
      throw new UnauthorizedException('Incorrect password');
    }

    const fn_gen = await this.generateToken(
      db_operation[0].username,
      db_operation[0].id,
    );
    return {
      jwt_Token: fn_gen,
    };
  }
}
