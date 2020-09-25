import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmailSubscriptionDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
