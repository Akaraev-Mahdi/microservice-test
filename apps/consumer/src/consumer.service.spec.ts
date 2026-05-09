import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerService } from './consumer.service';
import { ConfigService } from '@nestjs/config';

describe('ConsumerService', () => {
  let service: ConsumerService;

  const mockConfigService = {
    getOrThrow: jest.fn((key: string) => {
      if (key === 'TELEGRAM_BOT_TOKEN') return 'fake_token';
      if (key === 'TELEGRAM_CHAT_ID') return '123456';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumerService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ConsumerService>(ConsumerService);
  });

  it('должен корректно форматировать сообщение', async () => {
    const sendSpy = jest.spyOn((service as any).bot.telegram, 'sendMessage')
      .mockResolvedValue({} as any);

    const data = { id: 'uuid-123', text: 'Hello' };
    await service.sendTelegramMessage(data);

    expect(sendSpy).toHaveBeenCalledWith(
      expect.any(Number),
      expect.stringContaining('uuid-123')
    );
  });
});

