import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { OrderStatus } from "../../common/enums/order-status.enum";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    orderId: string;

    @Column('enum', { enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, {
        cascade: true,
        eager: true,
    })
    orderItems: OrderItem[];

    @CreateDateColumn()
    orderDate: Date;
}
