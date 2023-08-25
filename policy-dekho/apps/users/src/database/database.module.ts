import { Module } from '@nestjs/common';
import { DatabaseRepository } from './database-repository';

@Module({
    providers: [DatabaseRepository],
    exports: [DatabaseRepository]
})
export class DatabaseModule {}
