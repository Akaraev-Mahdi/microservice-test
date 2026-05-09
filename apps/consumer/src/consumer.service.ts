import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

@Injectable()
export class ConsumerService {
  private readonly bot: Telegraf;
  private readonly logger = new Logger(ConsumerService.name);
  private readonly chatId: number;

  constructor(private configService: ConfigService) {
    const token = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    const rawChatId = this.configService.getOrThrow<string>('TELEGRAM_CHAT_ID');

    this.chatId = Number(rawChatId);
    this.bot = new Telegraf(token);

    if (isNaN(this.chatId)) {
      throw new Error('TELEGRAM_CHAT_ID must be a valid number');
    }
  }

  async sendTelegramMessage(data: { id: string; text: string }) {
    try {
      const message = `🔔 Новое событие!\nID: ${data.id}\nТекст: ${data.text}`;
      await this.bot.telegram.sendMessage(this.chatId, message);
      this.logger.log(`Сообщение ${data.id} успешно отправлено`);
      return true;
    } catch (error: any) {
      this.logger.error(`Ошибка отправки сообщения ${data.id}: ${error.message}`);
      throw error;
    }
  }
}
