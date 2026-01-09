// Service Interface
export interface IOrderService {
    findAll(): Promise<any[]>;
    findById(orderId: string): Promise<any>;
    create(orderData: any): Promise<any>;
    update(orderId: string, orderData: any): Promise<any>;
    delete(orderId: string): Promise<boolean>;
}

// Repository Interface
export interface IOrderRepository {
    findAll(): Promise<any[]>;
    findById(orderId: string): Promise<any>;
    create(orderData: any): Promise<any>;
    update(orderId: string, orderData: any): Promise<any>;
    delete(orderId: string): Promise<boolean>;
}