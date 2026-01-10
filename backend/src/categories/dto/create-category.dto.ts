import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCategoryDto {
    @MinLength(1)
    readonly name: string;
    readonly description?: string;
}
