import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/signin-request.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/roles.enum';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInRequestDto: SignInRequestDto) {
        return this.authService.signIn(signInRequestDto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
