import { IsEnum, MinLength } from "class-validator";
import { Role } from "src/common/enums/roles.enum";

export class UpdateUserDto {
    @MinLength(2)
    readonly fullName?: string;
    readonly hashedPassword?: string;

    @IsEnum(Role, { message: 'role must be a valid enum value' })
    readonly role?: Role;
}
