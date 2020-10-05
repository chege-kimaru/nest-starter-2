import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    profession: string;

    @IsOptional()
    expectations: string;

    @IsOptional()
    reference: string;
}
