import { MenuItem } from "src/menu-items/entities/menu-item.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    orderPrice: number;

    @Column('enum', { enum: ['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'], default: 'PENDING' })
    status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ManyToOne(() => MenuItem, menuItem => menuItem.orders)
    menuItem: MenuItem;
}
