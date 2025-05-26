/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, //Only allows the req which has dto in them
  //     forbidNonWhitelisted: true, //throws err if like data which dto is not there,
  //     transform: true, //when the data comes according it is in json format but it transoforms the val automaticlally to their given dto ex name (int) = "name":"12" +> after "name":12
  //     disableErrorMessages: false,
  //   }),
  // );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
