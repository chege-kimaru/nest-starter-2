import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ForgotPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
