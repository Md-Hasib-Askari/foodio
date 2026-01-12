import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repo';
import { MenuItemsService } from 'src/menu-items/menu-items.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly _ordersRepo: OrdersRepository,
    private readonly _menuItemsService: MenuItemsService,
  ) { }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const menuItems = createOrderDto.orderItems.map(item => item.menuItemId);

    const fetchedMenuItems = await this._menuItemsService.findByIds(menuItems);
    if (fetchedMenuItems.length !== menuItems.length) {
      const unavailableItems = menuItems.filter(itemId =>
        !fetchedMenuItems.some(fetchedItem => fetchedItem.menuItemId === itemId)
      );
      Logger.warn(`Unavailable menu items: ${unavailableItems.join(', ')}`, 'OrdersService');
      throw new BadRequestException({
        message: 'One or more menu items are unavailable',
        unavailableItems
      });
    }

    const orderItems = fetchedMenuItems.map(menuItem => {
      const requestedItem = createOrderDto.orderItems.find(item => item.menuItemId === menuItem.menuItemId);
      if (!requestedItem) {
        throw new BadRequestException(`Menu item ${menuItem.menuItemId} not found in the order request`);
      }
      return {
        menuItemId: menuItem.menuItemId,
        quantity: requestedItem.quantity,
        priceAtOrder: menuItem.price,
      };
    });

    return this._ordersRepo.create({
      orderItems,
      userId
    });
  }

  async findAll() {
    return await this._ordersRepo.findAll();
  }

  async findOne(orderId: string) {
    return await this._ordersRepo.findOne(orderId);
  }

  async findByUserId(userId: string) {
    return await this._ordersRepo.findByUserId(userId);
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    const { orderItems } = updateOrderDto;
    if (orderItems) {
      const menuItems = orderItems.map(item => item.menuItemId);
      const fetchedMenuItems = await this._menuItemsService.findByIds(menuItems);
      if (fetchedMenuItems.length !== menuItems.length) {
        throw new BadRequestException('One or more menu items are invalid');
      }
    }
    return await this._ordersRepo.update(orderId, updateOrderDto);
  }

  async updateStatus(orderId: string, updateOrderDto: UpdateOrderDto) {
    return await this._ordersRepo.update(orderId, { status: updateOrderDto.status });
  }

  async remove(orderId: string) {
    return await this._ordersRepo.remove(orderId);
  }
}
