import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ResendVerifyUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
