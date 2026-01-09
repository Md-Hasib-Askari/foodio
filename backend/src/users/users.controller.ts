import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserRequest } from './dto/create-user-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserRequest: CreateUserRequest) {
    return await this.usersService.create(createUserRequest);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return await this.usersService.findOne(userId);
  }

  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    return await this.usersService.remove(userId);
  }
}
