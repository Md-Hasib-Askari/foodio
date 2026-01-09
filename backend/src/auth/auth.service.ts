import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import { JwtService } from '@nestjs/jwt';

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

    private async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }
}
