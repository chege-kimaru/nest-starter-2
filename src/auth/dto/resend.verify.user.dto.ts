import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ResendVerifyUserDto {
  @ApiProperty({ example: 'k1@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
