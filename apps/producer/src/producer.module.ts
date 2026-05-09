import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATIONS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
            queue: 'notifications_queue',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
