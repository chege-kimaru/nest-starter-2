import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../../user/user.model';

export class ChangePasswordDto {
  user: User;
  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ example: '1234567' })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
