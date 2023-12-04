import {
  IsBoolean,
  isEnum,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Expose } from 'class-transformer';

// ---------- ---------- ---------- ---------- ----------

import { BrandEntity } from '../../brands/entities/brand.entity';

export class WalletDTO {
  @IsNotEmpty()
  @IsString()
  walletName: string;

  @IsNumber()
  availableBalance: number;

  @Expose()
  brand: BrandEntity;
}
