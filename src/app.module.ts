/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import * as evv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabseModule } from './databse/databse.module';
evv.config()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HelloModule, 
    UserModule, PostModule ,
     TypeOrmModule,
     DatabseModule,
     
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
