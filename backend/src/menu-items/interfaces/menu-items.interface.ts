// Service Interface
export interface IMenuItemService {
    findAll(): Promise<any[]>;
    findById(menuItemId: string): Promise<any>;
    create(menuItemData: any): Promise<any>;
    update(menuItemId: string, menuItemData: any): Promise<any>;
    delete(menuItemId: string): Promise<boolean>;
}

// Repository Interface
export interface IMenuItemRepository {
    findAll(): Promise<any[]>;
    findById(menuItemId: string): Promise<any>;
    create(menuItemData: any): Promise<any>;
    update(menuItemId: string, menuItemData: any): Promise<any>;
    delete(menuItemId: string): Promise<boolean>;
}