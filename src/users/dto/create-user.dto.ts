import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        firstName: string;

        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        lastName: string;

        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        password: string;
        
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        email: string;

        @ApiProperty()
        @IsDate()
        @Type(() => Date)
        @IsNotEmpty()
        birthDay: string;
}
