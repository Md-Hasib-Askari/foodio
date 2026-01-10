export class CreateUserDto {
    readonly email: string;
    readonly hashedPassword: string;
    readonly fullName: string;
}