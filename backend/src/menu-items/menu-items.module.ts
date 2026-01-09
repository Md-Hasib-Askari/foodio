import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsController } from './menu-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Order, Category])],
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
})
export class MenuItemsModule { }
