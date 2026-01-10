import { IsEmail, IsStrongPassword, } from "class-validator";

export class SignInRequestDto {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}