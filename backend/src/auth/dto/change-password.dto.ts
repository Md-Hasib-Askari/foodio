import { IsNotEmpty, IsStrongPassword } from "class-validator";
import { Match } from "src/common/validators/match.validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    readonly currentPassword: string;

    @IsStrongPassword()
    readonly newPassword1: string;

    @Match('newPassword1', { message: 'Passwords do not match' })
    readonly newPassword2: string;
}