import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

// ---------- ---------- ---------- ---------- ----------

import { BrandEntity } from '../../brands/entities/brand.entity';

export class StoreDTO {
  @IsNotEmpty()
  @IsString()
  storeName: string;

  @Expose()
  brand: BrandEntity;

  emails: string[];
  phones: string[];
}

export class StoreUpdateDTO {
  @IsOptional()
  @IsString()
  storeName: string;
}
