import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { UsersRepository } from './users.repo';

@Injectable()
export class UsersService {
  constructor(
    private readonly _repo: UsersRepository,
  ) { }

  async create(createUserRequest: CreateUserRequest) {
    const existingUser = await this._repo.findOneByEmail(createUserRequest.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    if (createUserRequest.password1 !== createUserRequest.password2) {
      throw new ConflictException('Passwords do not match');
    }
    if (createUserRequest.password1.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }
    if (!createUserRequest.fullName || createUserRequest.fullName.trim() === '') {
      throw new BadRequestException('Full name is required');
    }
    const hashedPassword = bcrypt.hashSync(createUserRequest.password1, 10);
    const userToCreate = {
      email: createUserRequest.email,
      hashedPassword: hashedPassword,
      fullName: createUserRequest.fullName,
    };
    const createdUser = await this._repo.create(userToCreate);

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

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this._repo.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password1 || updateUserDto.password2) {
      if (updateUserDto.password1 !== updateUserDto.password2) {
        throw new ConflictException('Passwords do not match');
      }
      if (updateUserDto.password1 && updateUserDto.password1.length < 6) {
        throw new BadRequestException('Password must be at least 6 characters long');
      }
      const hashedPassword = bcrypt.hashSync(updateUserDto.password1, 10);
      user['hashedPassword'] = hashedPassword;
    }

    if (updateUserDto.fullName !== undefined) {
      if (updateUserDto.fullName.trim() === '') {
        throw new BadRequestException('Full name cannot be empty');
      }
      user['fullName'] = updateUserDto.fullName;
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
