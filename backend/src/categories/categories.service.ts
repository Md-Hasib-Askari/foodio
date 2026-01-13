import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repo';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepo: CategoriesRepository) { }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepo.create(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepo.findAll();
  }

  async findTopCategories() {
    return await this.categoryRepo.findTopCategories();
  }

  async findOne(categoryId: string) {
    return await this.categoryRepo.findOne(categoryId);
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepo.update(categoryId, updateCategoryDto);
  }

  async remove(categoryId: string) {
    return await this.categoryRepo.remove(categoryId);
  }
}
