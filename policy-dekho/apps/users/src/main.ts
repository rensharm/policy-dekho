import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'users',
        port: 3002
      }
    },
  );
  await app.listen();
  Logger.log(
    `Microservice is running on http://localhost:${process.env.PORT}/api/v1`,
  );
}
bootstrap();
