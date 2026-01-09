import { Order } from "../../orders/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column('varchar', { unique: true, length: 100 })
    email: string;

    @Column('varchar', { length: 100 })
    hashedPassword: string;

    @Column('varchar', { length: 100 })
    fullName: string;

    @Column('enum', { enum: ['USER', 'ADMIN'], default: 'USER' })
    role: 'USER' | 'ADMIN';

    @Column('boolean', { default: false })
    isActive: boolean;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
