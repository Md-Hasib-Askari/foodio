import { MenuItem } from '../../menu-items/entities/menu-item.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => MenuItem, menuItem => menuItem.category, {
        cascade: true,
    })
    @JoinColumn({ name: 'menuItemId' })
    menuItems: MenuItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
