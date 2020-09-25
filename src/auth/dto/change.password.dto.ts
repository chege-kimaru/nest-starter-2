import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../../user/user.model';

export class ChangePasswordDto {
  user: User;
  @IsNotEmpty()
  currentPassword: string;
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
