import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { jwtConstants } from './auth/constants';
import { PolicyController } from './policies/policy.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360s' },
    }),
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
  ],
  controllers: [AppController,AuthController, PolicyController, UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
    ],
})
export class AppModule {
}
