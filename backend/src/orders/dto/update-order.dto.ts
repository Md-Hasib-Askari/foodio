import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderRepoDto } from './create-order-repo.dto';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderRepoDto) {
    @IsEnum(OrderStatus)
    status?: OrderStatus;
}
