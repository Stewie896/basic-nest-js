/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entityy } from './entities';

@Module({
   imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: '127.0.0.1',
        database: 'nest',
        username: 'postgres',
        password: 'Yukino123@',
        entities: [Entityy],
        synchronize: true
    })
   ]
})
export class DatabseModule {}
