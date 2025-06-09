/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entityy } from './entities';
import { User_Entity } from 'src/auth/db/auth_entity';

@Module({
   imports: [
    TypeOrmModule.forRoot({
        type: process.env.type,
        host: process.env.host',
        database: process.env.db,
        username: process.env.name,
        password: process.env.pwd,
        entities: [Entityy , User_Entity],
        synchronize: true
    })
   ]
})
export class DatabseModule {}
