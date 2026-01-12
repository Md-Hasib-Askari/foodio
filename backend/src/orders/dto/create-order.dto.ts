import { IsArray, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    orderItems: OrderItemDto[];
}

class OrderItemDto {
    @IsNotEmpty()
    menuItemId: string;

    @IsInt()
    quantity: number;

    @IsInt()
    @IsPositive()
    priceAtOrder: number;
}
