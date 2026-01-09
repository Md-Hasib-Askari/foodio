// Service Interface
export interface IUserService {
    findAll(): Promise<any[]>;
    findById(userId: string): Promise<any>;
    create(userData: any): Promise<any>;
    update(userId: string, userData: any): Promise<any>;
    delete(userId: string): Promise<boolean>;
}