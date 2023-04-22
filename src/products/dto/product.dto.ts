import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
// ---------- ---------- ---------- ---------- ----------

import { CategoryEntity } from 'src/categories/entities/catogory.entity';

export class ProductDTO {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @Expose()
  category: CategoryEntity;
}
