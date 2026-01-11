import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateCategoryDto {
    @MinLength(1)
    readonly name: string;

    @IsOptional()
    readonly description?: string;
}
