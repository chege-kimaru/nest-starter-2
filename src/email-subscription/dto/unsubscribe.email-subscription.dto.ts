import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UnsubscribeEmailSubscriptionDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  token:string;
}
