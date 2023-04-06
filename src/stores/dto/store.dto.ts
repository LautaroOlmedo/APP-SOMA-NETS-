import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { BrandEntity } from 'src/brands/entities/brand.entity';

// ---------- ---------- ---------- ---------- ----------

export class StoreDTO {
  @IsNotEmpty()
  @IsString()
  storeName: string;
  @Expose()
  brand: BrandEntity;

  emails: string[];
}

export class StoreUpdateDTO {
  @IsOptional()
  @IsString()
  storeName: string;
}
