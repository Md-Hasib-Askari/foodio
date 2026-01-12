import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from './entities/order-item.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { OrdersRepository } from './orders.repo';
import { MenuItemsModule } from 'src/menu-items/menu-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuItem, Order, User, OrderItem]),
    MenuItemsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule { }
