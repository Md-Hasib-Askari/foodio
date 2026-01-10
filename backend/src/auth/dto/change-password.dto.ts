import { IsNotEmpty, IsStrongPassword } from "class-validator";
import { Match } from "src/common/validators/match.validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    readonly currentPassword: string;

    @IsStrongPassword()
    readonly newPassword: string;

    @Match('newPassword', { message: 'Passwords do not match' })
    readonly confirmNewPassword: string;
}