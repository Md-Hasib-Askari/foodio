import { MenuItem } from "../../menu-items/entities/menu-item.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    orderItemId: string;

    @ManyToOne(() => MenuItem, menuItem => menuItem.orderItems, {
        cascade: true,
        nullable: false,
    })
    @JoinColumn({ name: 'menuItemId' })
    menuItem: MenuItem;

    @ManyToOne(() => Order, order => order.orderItems)
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    priceAtOrder: number;
}