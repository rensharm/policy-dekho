import { Neo4jModule } from '@dbc-tech/nest-neo4j/dist';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

jest.mock('neo4j-driver/lib/driver');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule,
        UsersModule,
        DatabaseModule,
        Neo4jModule.forRoot({
            scheme: 'bolt',
            host: 'neo4j',
            port: 7687,
            username: 'neo4j',
            password: 'password',
          }),
        ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
