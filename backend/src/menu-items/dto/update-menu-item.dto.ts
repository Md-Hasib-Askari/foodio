import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menu-item.dto';
import { IsOptional } from 'class-validator';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
    @IsOptional()
    name?: string | undefined;

    @IsOptional()
    price?: number | undefined;

    @IsOptional()
    categoryId?: string | undefined;
}
