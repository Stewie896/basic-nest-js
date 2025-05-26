/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Entity } from './db/auth_entity';

@Module({
  exports: [
TypeOrmModule.forFeature([User_Entity]),
TypeOrmModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
