import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { of } from 'rxjs';
import { jwtConstants } from '../auth/constants';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

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
      controllers: [UsersController],
      providers: [
        {
          provide: APP_GUARD,
          useValue: new ThrottlerGuard({}, null, null)
        }
        ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe.only('purchasePolicy()', () => {
    it('should be able to purchase policy', async() => {
      const user =  {username: 'Renu'};
      jest.spyOn(controller.client, 'send').mockReturnValue(of('Policy Purchased'));
      const  result = await controller.purchasePolicy({user}, {policyName: 'policy1'});
      result.subscribe(res => {
        expect(res).toEqual('Policy Purchased');
      });
    });
  });

  describe('purchasePolicy()', () => {
    it('should be able to purchase policy', async() => {
      const user =  {username: 'Renu'};
      jest.spyOn(controller.client, 'send').mockReturnValue(of('Policy Purchased'));
      const  result = await controller.purchasePolicy({user}, {policyName: 'policy1'});
      result.subscribe(res => {
        expect(res).toEqual('Policy Purchased');
      });
    });
  });
});
