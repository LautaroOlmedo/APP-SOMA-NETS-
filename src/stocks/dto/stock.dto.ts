import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

// ---------- ---------- ---------- ---------- ----------

import { StoreEntity } from '../../stores/entities/store.entity';

export class StockDTO {
  @IsInt()
  quantity: number;

  @Expose()
  store: StoreEntity;
}
