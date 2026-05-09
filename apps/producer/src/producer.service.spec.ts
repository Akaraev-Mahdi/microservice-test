import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('ProducerService', () => {
  let service: ProducerService;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: 'NOTIFICATIONS_SERVICE',
          useValue: {
            emit: jest.fn().mockReturnValue(of(true)),
          },
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    clientProxy = module.get<ClientProxy>('NOTIFICATIONS_SERVICE');
  });

  it('должен быть определен', () => {
    expect(service).toBeDefined();
  });

  it('должен генерировать UUID и вызывать client.emit', async () => {
    const message = 'Test message';
    const emitSpy = jest.spyOn(clientProxy, 'emit');

    await service.dispatch(message);

    expect(emitSpy).toHaveBeenCalledWith(
      'notification_created',
      expect.objectContaining({
        id: expect.any(String),
        text: message,
      }),
    );
  });
});
