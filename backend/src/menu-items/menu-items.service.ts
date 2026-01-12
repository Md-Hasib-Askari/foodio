import { Injectable, Logger } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemsRepository } from './menu-items.repo';

@Injectable()
export class MenuItemsService {
  constructor(
    private readonly _menuItemsRepo: MenuItemsRepository,
  ) { }

  async create(createMenuItemDto: CreateMenuItemDto) {
    return await this._menuItemsRepo.create(createMenuItemDto);
  }

  async findAll() {
    return await this._menuItemsRepo.findAll();
  }

  async findOne(menuItemId: string) {
    return await this._menuItemsRepo.findOne(menuItemId);
  }

  async findByIds(menuItemIds: string[]) {
    return await this._menuItemsRepo.findMany(menuItemIds);
  }

  async findAllByCategory(categoryId: string) {
    return await this._menuItemsRepo.findAllByCategory(categoryId);
  }

  async update(menuItemId: string, updateMenuItemDto: UpdateMenuItemDto) {
    return await this._menuItemsRepo.update(menuItemId, updateMenuItemDto);
  }

  async remove(menuItemId: string) {
    return await this._menuItemsRepo.remove(menuItemId);
  }
}
