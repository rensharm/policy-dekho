import { UnauthorizedException } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Observable, of } from 'rxjs';
import { jwtConstants } from '../auth/constants';
import { PolicyController } from './policy.controller';

describe('PolicyController', () => {
  let controller: PolicyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          { 
            name: 'POLICY_SERVICE', 
            transport: Transport.TCP,
            options: {
              host: 'policies',
              port: 3001
            }
          },
          { 
            name: 'USER_SERVICE', 
            transport: Transport.TCP,
            options: {
              host: 'users',
              port: 3002
            }
          },
        ]),
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '360s' },
        }),
      ],
      controllers: [PolicyController],
      providers: [
        {
          provide: APP_GUARD,
          useValue: new ThrottlerGuard({}, null, null)
        }
        ],
    }).compile();

    controller = module.get<PolicyController>(PolicyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create policy', async() => {
        const policy = {
            name: 'policy1',
            category: 'medical',
            premium: 1000,
            sumAssured: 10000,
            tenure: 2,
            provider: 'icici'
        }
      jest.spyOn(controller.client, 'send').mockReturnValue(of('Done'));
      const  result = await controller.create(policy);
      result.subscribe(res => {
        expect(res).toEqual('Done');
      });
    });
  });

  describe('get()', () => {
    const policy = {
        name: 'name',
        category: 'medical',
        premium: 1000,
        sumAssured: 10000,
        tenure: 2,
        provider: 'icici'
    }
    it('should get the list of policies', async() => {
      jest.spyOn(controller.client, 'send').mockReturnValue(of([policy]));
      const  result = await controller.get();
      result.subscribe(res => {
        expect(res).toEqual([policy]);
      });
    });

    it('should get the policy by name', async() => {
        jest.spyOn(controller.client, 'send').mockReturnValue(of(policy));
        const  result = await controller.getPolicy({policyName: 'policy1'});
        result.subscribe(res => {
          expect(res).toEqual(policy);
        });
      });
  });
});
