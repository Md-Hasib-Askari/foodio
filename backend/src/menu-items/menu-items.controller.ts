import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return await this.menuItemsService.create(createMenuItemDto);
  }

  @Get()
  async findAll() {
    return await this.menuItemsService.findAll();
  }

  @Get(':menuItemId')
  async findOne(@Param('menuItemId') menuItemId: string) {
    return await this.menuItemsService.findOne(menuItemId);
  }

  @Get('category/:categoryId')
  async findAllByCategory(@Param('categoryId') categoryId: string) {
    return await this.menuItemsService.findAllByCategory(categoryId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':menuItemId')
  async update(@Param('menuItemId') menuItemId: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return await this.menuItemsService.update(menuItemId, updateMenuItemDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':menuItemId')
  async remove(@Param('menuItemId') menuItemId: string) {
    return await this.menuItemsService.remove(menuItemId);
  }
}
