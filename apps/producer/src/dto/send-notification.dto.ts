import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({
    example: 'Hello, this is a test message!',
    description: 'Текст уведомления, которое будет отправлено в Telegram',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  message: string | undefined;
}
