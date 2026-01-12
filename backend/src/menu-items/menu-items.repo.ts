import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenuItemsRepository {
  constructor(
    @InjectRepository(MenuItem)
    private readonly _db: Repository<MenuItem>,
  ) { }

  async create(createMenuItemDto: CreateMenuItemDto) {
    const { name, description, price, available, categoryId } = createMenuItemDto;
    const menuItem = this._db.create({
      name: name,
      description: description,
      price: price,
      available: available,
      category: { categoryId: categoryId },
    });
    return await this._db.save(menuItem);
  }

  async findAll() {
    return await this._db.find();
  }

  async findOne(menuItemId: string) {
    return await this._db.findOneBy({ menuItemId });
  }

  async findMany(menuItemIds: string[]) {
    return await this._db.findBy({ menuItemId: In(menuItemIds), available: true });
  }

  async findAllByCategory(categoryId: string) {
    return await this._db.find({ where: { category: { categoryId } } });
  }

  async update(menuItemId: string, updateMenuItemDto: UpdateMenuItemDto) {
    const { categoryId, ...dto } = updateMenuItemDto;
    const result = await this._db.update({ menuItemId }, {
      ...dto,
      ...(categoryId && { category: { categoryId } }),
    });

    if (result.affected && result.affected > 0) {
      return this.findOne(menuItemId);
    }
    return null;
  }

  async remove(menuItemId: string) {
    return await this._db.delete({ menuItemId });
  }
}
