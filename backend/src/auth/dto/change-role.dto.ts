import { IsEnum } from "class-validator";
import { Role } from "src/common/enums/roles.enum";

export class ChangeRoleDto {
    @IsEnum(Role, { message: 'Role must be either user or admin' })
    readonly role: Role;
}