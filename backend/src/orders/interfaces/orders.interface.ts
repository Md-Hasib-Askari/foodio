import { CreateOrderRepoDto } from "../dto/create-order-repo.dto";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entities/order.entity";

// Service Interface
export interface IOrderService {
    findAll(): Promise<any[]>;
    findById(orderId: string): Promise<any>;
    findByUserId(userId: string): Promise<any[]>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    update(orderId: string, orderData: any): Promise<any>;
    delete(orderId: string): Promise<boolean>;
}

// Repository Interface
export interface IOrderRepository {
    findAll(): Promise<any[]>;
    findById(orderId: string): Promise<any>;
    findByUserId(userId: string): Promise<any[]>;
    create(createOrderRepoDto: CreateOrderRepoDto): Promise<Order>;
    update(orderId: string, orderData: any): Promise<any>;
    delete(orderId: string): Promise<boolean>;
}