import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
// ---------- ---------- ---------- ---------- ----------

import { CategoryEntity } from 'src/categories/entities/catogory.entity';
import { size, talle } from 'src/constants/enums';

export class ProductDTO {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @Expose()
  category: CategoryEntity;

  @IsNotEmpty()
  @IsInt()
  @Min(9)
  @Max(250)
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  code: number;

  @IsOptional()
  size: size;

  @IsOptional()
  talle: talle;
}

export class UpdateProductDTO {
  @IsOptional()
  @IsInt()
  quantity: number;
}
