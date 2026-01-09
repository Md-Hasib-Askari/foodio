import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':categoryId')
  async findOne(@Param('categoryId') categoryId: string) {
    return await this.categoriesService.findOne(categoryId);
  }

  @Patch(':categoryId')
  update(@Param('categoryId') categoryId: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  async remove(@Param('categoryId') categoryId: string) {
    return await this.categoriesService.remove(categoryId);
  }
}
