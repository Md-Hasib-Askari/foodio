import { CreateCategoryResponse } from "../dto/create-category-response.dto";
import { GetAllCategoryResponseDto } from "../dto/get-all-category-response.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";

// Service Interface
export interface ICategoryService {
    findAll(): Promise<CreateCategoryResponse[]>;
    findById(categoryId: string): Promise<GetAllCategoryResponseDto>;
    create(categoryData: any): Promise<CreateCategoryResponse>;
    update(categoryId: string, categoryData: UpdateCategoryDto): Promise<CreateCategoryResponse>;
    delete(categoryId: string): Promise<boolean>;
}

// Repository Interface
export interface ICategoryRepository {
    findAll(): Promise<CreateCategoryResponse[]>;
    findById(categoryId: string): Promise<GetAllCategoryResponseDto>;
    create(categoryData: any): Promise<CreateCategoryResponse>;
    update(categoryId: string, categoryData: UpdateCategoryDto): Promise<CreateCategoryResponse>;
    delete(categoryId: string): Promise<boolean>;
}