import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repo';
import { Role } from 'src/common/enums/roles.enum';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(signInRequestDto: SignInRequestDto): Promise<SignInResponseDto> {
        const { email, password } = signInRequestDto;
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const isPasswordValid = await this.validatePassword(password, user.hashedPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { sub: user.userId, email: user.email, role: user.role };


        const accessToken = this.jwtService.sign(payload);
        return {
            success: true,
            accessToken: accessToken,
        };
    }

    async register(registerRequestDto: RegisterRequestDto): Promise<any> {
        const { email, password, fullName, address } = registerRequestDto;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const userToCreate = {
            email,
            hashedPassword,
            fullName,
            address
        };
        const createdUser = await this.usersService.create(userToCreate);
        return createdUser;
    }

    async changeUserRole(userId: string, newRole: Role): Promise<any> {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const updatedUser = await this.usersService.update(userId, { role: newRole });
        return updatedUser;
    }

    private async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }
}
