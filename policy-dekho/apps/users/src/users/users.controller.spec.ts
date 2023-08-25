import { Neo4jModule } from '@dbc-tech/nest-neo4j/dist/neo4j.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';

jest.mock('neo4j-driver/lib/driver');

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule,
        Neo4jModule.forRoot({
            scheme: 'bolt',
            host: 'neo4j',
            port: 7687,
            username: 'neo4j',
            password: 'password',
          }),
        DatabaseModule],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
