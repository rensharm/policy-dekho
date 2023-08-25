import { Neo4jModule, Neo4jService } from '@dbc-tech/nest-neo4j/dist';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseRepository } from '../database/database-repository';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

jest.mock('neo4j-driver/lib/driver');

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const mockneo4jService = new Neo4jService(null, null);
    const mockDatabaseRepository: DatabaseRepository = new DatabaseRepository(mockneo4jService);
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule,
        Neo4jModule.forRoot({
            scheme: 'bolt',
            host: 'neo4j',
            port: 7687,
            username: 'neo4j',
            password: 'password',
          }),
    ],
      controllers: [AuthController],
      providers: [AuthService, {
        provide: DatabaseRepository,
        useValue: mockDatabaseRepository
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
