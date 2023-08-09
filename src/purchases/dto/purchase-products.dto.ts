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
import { ProductEntity } from 'src/products/entities/product.entity';
import { PurchaseEntity } from '../entities/purchase.entity';

// ---------- ---------- ---------- ---------- ----------

export class PurchaseProductsDTO {
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @Expose()
  product: ProductEntity;

  @Expose()
  purchase: PurchaseEntity;
}
