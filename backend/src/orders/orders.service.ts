import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(orderId: string) {
    return `This action returns a #${orderId} order`;
  }

  update(orderId: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${orderId} order`;
  }

  remove(orderId: string) {
    return `This action removes a #${orderId} order`;
  }
}
