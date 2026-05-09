import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProducerModule } from './producer.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProducerModule);

  const config = new DocumentBuilder()
    .setTitle('Notification Producer')
    .setDescription('API для отправки уведомлений в RabbitMQ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

