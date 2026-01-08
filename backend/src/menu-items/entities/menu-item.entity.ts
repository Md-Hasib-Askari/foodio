import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ForeignKey,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity('menu_items')
export class MenuItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { unique: true, length: 100 })
    name: string;

    @Column('varchar', { nullable: true, length: 255 })
    description: string;

    @Column('varchar', { length: 255 })
    imageUrl: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ default: true })
    available: boolean;

    @ForeignKey(() => Category)
    @Column()
    categoryId: string;

    @ManyToOne(() => Category, category => category.menuItems)
    category: Category;

    @ManyToOne(() => Order, order => order.menuItem)
    orders: Order[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}