/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entityy } from './entities';
import { User_Entity } from 'src/auth/db/auth_entity';

@Module({
   imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: '127.0.0.1',
        database: 'nest',
        username: 'postgres',
        password: 'Yukino123@',
        entities: [Entityy , User_Entity],
        synchronize: true
    })
   ]
})
export class DatabseModule {}
