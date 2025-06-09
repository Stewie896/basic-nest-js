/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Entity } from './db/auth_entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
TypeOrmModule.forFeature([User_Entity]),
JwtModule.register({}),
PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  
})
export class AuthModule {}
