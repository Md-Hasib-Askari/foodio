import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly _db: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this._db.create(createCategoryDto);
    return await this._db.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this._db.find();
  }

  async findOne(categoryId: string): Promise<Category | null> {
    return await this._db.findOneBy({ categoryId });
  }

  async findTopCategories(): Promise<Category[]> {
    const categories = await this._db
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.menuItems', 'menuItem')
      .orderBy('category.createdAt', 'DESC')
      .take(3)
      .getMany();

    return categories;
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    const { name, description } = updateCategoryDto;
    const result = await this._db.update(categoryId, {
      ...(name && { name }),
      ...(description && { description }),
    });
    if (result.affected && result.affected > 0) {
      return this.findOne(categoryId);
    }
    return null;
  }

  async remove(categoryId: string): Promise<boolean> {
    const result = await this._db.delete({ categoryId });
    return !!(result.affected && result.affected > 0);
  }
}
