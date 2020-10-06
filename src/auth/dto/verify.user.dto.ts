import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty({ example: 'k1@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'b8c96aef-9e58-4d4c-b059-9ce938771d7f' })
  @IsUUID()
  @IsNotEmpty()
  token: string;
}
