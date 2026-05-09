import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern('notification_created')
  async handleNotification(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.consumerService.sendTelegramMessage(data);
      channel.ack(originalMsg);
    } catch (error) {
      channel.nack(originalMsg, false, true); 
    }
  }
}

