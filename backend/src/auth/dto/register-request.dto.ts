import { Contains, IsEmail, IsString, IsStrongPassword, Matches, Max, MaxLength, Min, MinLength } from "class-validator";
import { Match } from "src/common/validators/match.validator";

export class RegisterRequestDto {
    @IsEmail()
    readonly email: string;

    @IsStrongPassword()
    @MinLength(6)
    @MaxLength(32)
    readonly password1: string;

    @Match('password1', { message: 'Passwords do not match' })
    readonly password2: string;

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly fullName: string;
}