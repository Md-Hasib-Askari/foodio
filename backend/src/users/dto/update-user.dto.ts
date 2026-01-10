import { IsStrongPassword, MinLength } from "class-validator";
import { Match } from "src/common/validators/match.validator";

export class UpdateUserDto {
    @MinLength(2)
    readonly fullName?: string;

    @IsStrongPassword()
    readonly password1?: string;

    @Match('password1', { message: 'Passwords do not match' })
    readonly password2?: string;
}
