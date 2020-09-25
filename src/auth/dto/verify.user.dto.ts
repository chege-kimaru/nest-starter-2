import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class VerifyUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUUID()
  @IsNotEmpty()
  token: string;
}
