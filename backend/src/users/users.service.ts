import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repo';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly _repo: UsersRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existingUser = await this._repo.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const createdUser = await this._repo.create(createUserDto);

    const { hashedPassword: _, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this._repo.findAll();
    return users.map(({ hashedPassword, ...user }) => user);
  }

  async findOne(userId: string) {
    const user = await this._repo.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { hashedPassword: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    return await this._repo.findOneByEmail(email);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { fullName, hashedPassword, role } = updateUserDto;
    const user = await this._repo.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (hashedPassword) {
      user['hashedPassword'] = hashedPassword
    }

    if (fullName) {
      user['fullName'] = fullName;
    }

    if (role) {
      user['role'] = role;
    }

    const updatedUser = await this._repo.update(user);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    const { hashedPassword: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(userId: string) {
    return await this._repo.remove(userId);
  }
}
