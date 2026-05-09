# Nest.js + RabbitMQ + Telegram Notification System

Микросервисная архитектура для отправки уведомлений.

## Стек
- **Framework:** Nest.js (Monorepo)
- **Broker:** RabbitMQ
- **API:** Telegram Bot API (via Telegraf)
- **Documentation:** Swagger
- **DevOps:** Docker, Docker Compose

## Как запустить

1. **Настройка окружения:**
   Создайте `.env` в корне проекта (см. `.env.example`):
   ```env
   TELEGRAM_BOT_TOKEN=your_token
   TELEGRAM_CHAT_ID=your_id
   RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
   ```

2. **Запуск через Docker:**
   ```bash
   docker-compose up --build
   ```

3. **Документация API:**
   После запуска Producer доступен по адресу: `http://localhost:3000/api`

## Особенности реализации
- **Идемпотентность:** Каждое сообщение генерирует UUID на стороне Producer. Consumer проверяет ID перед обработкой.
- **Надежность:** Реализован механизм ручного подтверждения (ACK) в RabbitMQ. При ошибке API Telegram сообщение возвращается в очередь (retry).
- **SOLID:** Логика уведомлений вынесена в отдельный сервис, зависимости инжектируются через интерфейсы.
- **Валидация:** Все входящие запросы проверяются через `class-validator`.

### Также

В связи с ограничениями доступа к Telegram API, для корректной работы сервиса уведомлений внутри Docker необходимо наличие активного VPN-соединения на хост-машине в режиме Global Tunnel.

## Тестирование
```bash
# Unit тесты
npm run test
```