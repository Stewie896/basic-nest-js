/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HelloModule } from 'src/hello/hello.module';

@Module({
    imports: [HelloModule],
  controllers: [UserController]
})
export class UserModule {}
