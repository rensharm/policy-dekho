import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PolicyModule } from './policy/policy.module';
import { Neo4jModule } from '@dbc-tech/nest-neo4j';

@Module({
  imports: [
    PolicyModule,
    Neo4jModule.forRoot({
      scheme: 'bolt',
      host: 'neo4j',
      port: 7687,
      username: 'neo4j',
      password: 'password',
     // database: 'Policy Dekho DBMS',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
