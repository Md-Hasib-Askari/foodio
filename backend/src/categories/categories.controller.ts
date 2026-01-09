import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  update(@Param('categoryId') categoryId: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':categoryId')
  async remove(@Param('categoryId') categoryId: string) {
    return await this.categoriesService.remove(categoryId);
  }
}
