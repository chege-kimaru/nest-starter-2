import { IsEmail, IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class ForgotChangePassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUUID()
  @IsNotEmpty()
  token: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
