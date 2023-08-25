import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
        options: {
          host: 'policies',
          port: 3001
        }
    },
  );
  await app.listen();
  Logger.log(
    `Microservice is running on http://localhost:${process.env.PORT}/api/v1`,
  );
}
bootstrap();
