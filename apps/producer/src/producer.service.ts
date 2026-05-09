import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async dispatch(message: string) {
    const payload = {
      id: uuidv4(),
      text: message,
      timestamp: new Date().toISOString(),
    };

    return this.client.emit('notification_created', payload);
  }
}
