import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repo';
import { Role } from 'src/common/enums/roles.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly _userRepo: UsersRepository,
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

    async register(registerRequestDto: any): Promise<any> {
        const { email, password1, fullName } = registerRequestDto;
        const hashedPassword = bcrypt.hashSync(password1, 10);
        const userToCreate = {
            email,
            hashedPassword,
            fullName
        };
        const createdUser = await this._userRepo.create(userToCreate);
        const { hashedPassword: _, ...userWithoutPassword } = createdUser;
        return userWithoutPassword;
    }

    async changeUserRole(userId: string, newRole: Role): Promise<any> {
        const user = await this._userRepo.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.role = newRole;
        const updatedUser = await this._userRepo.update(user);
        const { hashedPassword: _, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }

    private async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }
}
