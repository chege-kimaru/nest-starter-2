import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ForgotPassDto {
  @ApiProperty({ example: 'k1@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
