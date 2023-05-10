import { Expose } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
// ---------- ---------- ---------- ---------- ----------

import { CategoryEntity } from '../../categories/entities/catogory.entity';
import { size, talle } from '../../constants/enums';
import { ProductEntity } from '../entities/product.entity';
import { StockEntity } from '../../stocks/entities/stock.entity';

export class ProductDTO {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @Expose()
  category: CategoryEntity;

  @Expose()
  stock: StockEntity;

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

export class ProductToStockDTO {
  @IsNotEmpty()
  @IsUUID()
  product: ProductEntity;

  @IsNotEmpty()
  @IsUUID()
  stock: StockEntity;
}
