import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly _db: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this._db.create(createUserDto);
    return this._db.save(user);
  }

  async findAll() {
    return await this._db.find();
  }

  async findOne(userId: string) {
    return await this._db.findOneBy({ userId });
  }

  async findOneByEmail(email: string) {
    return await this._db.findOneBy({ email });
  }

  async update(user: Partial<User>) {
    return await this._db.save(user);
  }

  async remove(userId: string): Promise<boolean> {
    const result = await this._db.delete({ userId });
    return !!(result.affected && result.affected > 0);
  }
}
