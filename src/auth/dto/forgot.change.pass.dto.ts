import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class ForgotChangePassDto {

  @ApiProperty({ example: 'k1@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'b8c96aef-9e58-4d4c-b059-9ce938771d7f' })
  @IsUUID()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
