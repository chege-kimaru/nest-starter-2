import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'k1@gmail.com' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    password: string;
}