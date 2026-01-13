import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderRepoDto } from './dto/create-order-repo.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly _db: Repository<Order>,
  ) { }

  async create(createOrderRepoDto: CreateOrderRepoDto) {
    const { orderItems, userId } = createOrderRepoDto;
    const order = this._db.create({
      user: { userId },
      orderItems:
        orderItems.map(item => ({
          menuItem: { menuItemId: item.menuItemId },
          quantity: item.quantity,
          priceAtOrder: item.priceAtOrder,
        }))
    }
    );
    return await this._db.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this._db.find();
  }

  async findOne(orderId: string): Promise<Order | null> {
    return await this._db.findOneBy({ orderId });
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return await this._db.find({
      where: { user: { userId } },
      relations: {
        user: true,
        orderItems: {
          menuItem: true,
        }
      },
      order: { orderDate: 'DESC' },
    });
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    const { orderItems, status } = updateOrderDto;
    const order = await this._db.findOneBy({ orderId });
    if (!order) {
      return null;
    }

    const updatedOrder = {
      ...order,
      status: status ?? order.status,
    };

    updatedOrder.orderItems.map((item) => {
      if (item && orderItems) {
        const updatedItem = orderItems.find(oi => oi.menuItemId === item.orderItemId);
        if (updatedItem) {
          item.quantity = updatedItem.quantity ?? item.quantity;
        }
        return item;
      }
    });

    return await this._db.save(updatedOrder);
  }

  async remove(orderId: string) {
    const result = await this._db.delete({ orderId });
    return await (result.affected && result.affected > 0);
  }
}
