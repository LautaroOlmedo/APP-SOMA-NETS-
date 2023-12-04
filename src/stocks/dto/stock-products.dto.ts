import {
  IsBoolean,
  isEnum,
  IsEnum,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { ProductEntity } from '../../products/entities/product.entity';
import { StockEntity } from '../entities/stock.entity';

// ---------- ---------- ---------- ---------- ----------

export class ProductToStockDTO {
  @IsNumber()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsUUID()
  product: ProductEntity;

  @IsNotEmpty()
  @IsUUID()
  stock: StockEntity;
}
