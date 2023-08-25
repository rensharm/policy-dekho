import { Neo4jModule } from '@dbc-tech/nest-neo4j/dist';
import { Test, TestingModule } from '@nestjs/testing';
import { PolicyService } from './policy.service';

jest.mock('neo4j-driver/lib/driver');

describe('PolicyService', () => {
  let service: PolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Neo4jModule.forRoot({
          scheme: 'bolt',
          host: 'neo4j',
          port: 7687,
          username: 'neo4j',
          password: 'password',
        }),
      ],
      providers: [PolicyService],
    }).compile();

    service = module.get<PolicyService>(PolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
