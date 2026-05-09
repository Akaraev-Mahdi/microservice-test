import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class ProducerController {
  constructor(private readonly appService: ProducerService) {}

  @Post('send')
  @ApiOperation({ summary: 'Отправить уведомление' })
  @ApiBody({ schema: { example: { message: 'Hello World' } } })
  async send(@Body('message') message: string) {
    await this.appService.dispatch(message);
    return { status: 'Sent to RabbitMQ' };
  }
}

