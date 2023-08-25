import { Neo4jModule } from '@dbc-tech/nest-neo4j';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, UsersModule,
    Neo4jModule.forRoot({
      scheme: 'bolt',
      host: 'neo4j',
      port: 7687,
      username: 'neo4j',
      password: 'password',
     // database: 'Policy Dekho DBMS',
    }),
    DatabaseModule,],
  controllers: [AppController],
})
export class AppModule {}
