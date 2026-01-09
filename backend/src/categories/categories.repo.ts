import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly _repo: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this._repo.create(createCategoryDto);
    return await this._repo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this._repo.find();
  }

  async findOne(categoryId: string): Promise<Category | null> {
    return await this._repo.findOneBy({ categoryId });
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    const result = await this._repo.update(categoryId, updateCategoryDto);
    if (result.affected && result.affected > 0) {
      return this.findOne(categoryId);
    }
    return null;
  }

  async remove(categoryId: string): Promise<boolean> {
    const result = await this._repo.delete(categoryId);
    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }
}
