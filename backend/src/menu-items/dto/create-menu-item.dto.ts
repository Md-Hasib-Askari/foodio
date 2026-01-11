import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateMenuItemDto {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    description?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    imageUrl?: string;

    @IsNumber()
    @IsPositive()
    @Min(0.01)
    @Max(99999999.99)
    price: number;

    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @IsString()
    @IsNotEmpty()
    categoryId: string;
}
