import { PartialType } from '@nestjs/mapped-types';
// import { CreateManagerDto } from './create-manager.dto';
import { IsNumber, IsString } from 'class-validator';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

export class UpdateManagerDto extends PartialType(UpdateProductDto) {
    @IsString()
    name?: string;
    @IsString()
    description?: string;
    @IsNumber()
    price?: number;

}
