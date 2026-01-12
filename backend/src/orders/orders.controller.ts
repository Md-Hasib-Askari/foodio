import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role } from 'src/common/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post()
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.sub;
    return await this.ordersService.create(userId, createOrderDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('my-orders')
  async findByUserId(@Request() req) {
    Logger.log('Fetching orders for user:', req.user);
    const userId = req.user.userId;
    return await this.ordersService.findByUserId(userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get(':orderId')
  async findOne(@Param('orderId') orderId: string) {
    return await this.ordersService.findOne(orderId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':orderId')
  async update(@Param('orderId') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.update(orderId, updateOrderDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':orderId/status')
  async updateStatus(@Param('orderId') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.updateStatus(orderId, updateOrderDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':orderId')
  async remove(@Param('orderId') orderId: string) {
    return await this.ordersService.remove(orderId);
  }
}
