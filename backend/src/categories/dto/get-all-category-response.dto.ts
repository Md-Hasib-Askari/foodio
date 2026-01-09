export class GetAllCategoryResponseDto {
    readonly categories: {
        id: string;
        name: string;
        description?: string;
    }[];
}