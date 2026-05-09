import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'notifications_queue',
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.listen();
}
bootstrap();

