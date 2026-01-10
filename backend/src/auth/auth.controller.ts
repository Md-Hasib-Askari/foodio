import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/signin-request.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { RegisterRequestDto } from './dto/register-request.dto';
import { ChangeRoleDto } from './dto/change-role.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async signIn(@Body() signInRequestDto: SignInRequestDto) {
        return this.authService.signIn(signInRequestDto);
    }

    @Post('register')
    async register(@Body() registerRequestDto: RegisterRequestDto) {
        return this.authService.register(registerRequestDto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch('change-role/:userId')
    async changeUserRole(@Param('userId') userId: string, @Body('role') changeRoleDto: ChangeRoleDto) {
        const { role } = changeRoleDto;
        return this.authService.changeUserRole(userId, role);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
