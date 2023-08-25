import { UnauthorizedException } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Observable, of } from 'rxjs';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { SignUpDTo } from './dtos/sign-up.dto';

describe('AuthController', () => {
  let controller: AuthController;

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
      controllers: [AuthController],
      providers: [
        {
          provide: APP_GUARD,
          useValue: new ThrottlerGuard({}, null, null)
        }
        ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signin()', () => {
    it('should be able to sign up successfully', async() => {
      jest.spyOn(controller.client, 'send').mockReturnValue(of({sub: 'renu'}));
      jest.spyOn(controller.jwtService, 'sign').mockReturnValue('token');
      const  result = await controller.signIn({username: 'Renu', password: '123456'});
      result.subscribe(res => {
        expect(res.access_token).toEqual('token');
      });
    });

    it('should return unauthorized error when username or password is wrong', async() => {
      jest.spyOn(controller.client, 'send').mockReturnValue(of({}))
      const  result = await controller.signIn({username: 'Renu', password: '123456878'});
      result.subscribe(res => {
        expect(res.access_token).toBeUndefined();
      }, err =>{
        expect(err).toEqual(new UnauthorizedException());
      });
    });
  });

  describe('signup()', () => {
    it('should return access token when user logs in with valid username and password', async() => {
      const signUpPayload: SignUpDTo = {
        username: 'Renu',
        password: '123456',
        contactNo: '9888777667',
        address: '12gg hh56'
      }
      jest.spyOn(controller.client, 'send').mockReturnValue(of('User signed up successfully'));
      const  result = await controller.signUp(signUpPayload);
      result.subscribe(res => {
        expect(res).toEqual('User signed up successfully');
      });
    });
  });

});
