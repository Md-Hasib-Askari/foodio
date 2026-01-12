import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';

@Entity('menu_items')
export class MenuItem {
    @PrimaryGeneratedColumn('uuid')
    menuItemId: string;

    @Column('varchar', { unique: true, length: 100 })
    name: string;

    @Column('varchar', { nullable: true, length: 255 })
    description: string;

    @Column('varchar', { nullable: true, length: 255 })
    imageUrl: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ default: true })
    available: boolean;

    @ManyToOne(() => Category, category => category.menuItems, {
        onDelete: 'SET NULL',
        nullable: false,
    })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @OneToMany(() => OrderItem, orderItem => orderItem.menuItem)
    orderItems: OrderItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}