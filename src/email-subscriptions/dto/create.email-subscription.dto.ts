import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmailSubscriptionDto {
  @ApiProperty({ example: 'k1@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
