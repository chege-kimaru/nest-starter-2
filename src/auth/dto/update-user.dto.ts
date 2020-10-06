import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'kk1' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: 'kk1' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: '+254789765432' })
    @IsOptional()
    phone: string;
}
