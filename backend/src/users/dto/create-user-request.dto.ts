import { User } from "../entities/user.entity";

export class CreateUserRequest {
    readonly email: string;
    readonly password1: string;
    readonly password2: string;
    readonly fullName: string;
}